var config = require('../config/connection'),
	express = require('express'),
	models = require('../models'),
	_ = require('underscore'),
	async = require('async'),
	stream_node = require('getstream-node'),
	fs = require('fs'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');
const withAuth = require('../utils/auth');


var router = express.Router(),
	User = models.User,
	Item = models.Item,
	Pin = models.Pin,
	Follow = models.Follow;

var FeedManager = stream_node.FeedManager;
var StreamMongoose = stream_node.mongoose;
var StreamBackend = new StreamMongoose.Backend();

var enrichActivities = function(body) {
	var activities = body.results;
	return StreamBackend.enrichActivities(activities);
};

var enrichAggregatedActivities = function(body) {
	var activities = body.results;
	return StreamBackend.enrichAggregatedActivities(activities);
};


var did_i_pin_it = function(items, pins) {
	var pinned_items_ids = _.map(pins, function(pin) {
		return pin.item.toHexString();
	});
	_.each(items, function(item) {
		if (pinned_items_ids.indexOf(item._id.toHexString()) !== -1) {
			item.pinned = true;
		}
	});
};

var did_i_follow = function(users, followers) {
	var followed_users_ids = _.map(followers, function(item) {
		return item.target.toHexString();
	});
	_.each(users, function(user) {
		if (followed_users_ids.indexOf(user._id.toHexString()) !== -1) {
			user.followed = true;
		}
	});
};

router.use(withAuth, function(req, res, next) {
    const user_id = Object.values(req.session)[1];
	 		res.locals = {
			StreamConfigs: stream_node.settings,
			NotificationFeed: FeedManager.getNotificationFeed(
				user_id
			)
		};
	
	next();
});

router.use(function(error, req, res, next) {
	if (!error) {
		next();
	} else {
		console.error(error.stack);
		res.send(500);
	}
});

router.use(withAuth,function(req, res, next) {
    const user_id = Object.values(req.session)[1];
	 if (!user_id) {
		User.findOne({ username: req.user.username })
			.lean()
			.exec(function(err, user) {
				if (err) return next(err);

				notificationFeed = FeedManager.getNotificationFeed(user._id);

				req.user.id = user._id;
				req.user.token = notificationFeed.token;
				req.user.APP_ID = FeedManager.settings.apiAppId;
				req.user.APP_KEY = FeedManager.settings.apiKey;

				notificationFeed.get({ limit: 0 }).then(function(body) {
					if (typeof body !== 'undefined')
						req.user.unseen = body.unseen;
					next();
				});
			});
	} else {
		next();
	}
});

/*******************************
    Support DELETE from forms
*******************************/

router.use(bodyParser.urlencoded({ extended: true }));
router.use(
	methodOverride(function(req, res) {
		if (req.body && typeof req.body === 'object' && '_method' in req.body) {
			// look in urlencoded POST bodies and delete it
			var method = req.body._method;
			delete req.body._method;
			return method;
		}
	})
);

router.get('/', withAuth, function(req, res, next) {
	Item.find({}).populate('user').lean().exec(function(err, popular) {
		if (err) return next(err);

		if (req.isAuthenticated()) {
			Pin.find({ user: req.user.id })
				.lean()
				.exec(function(err, pinned_items) {
					did_i_pin_it(popular, pinned_items);
					return res.render('trending', {
						location: 'trending',
						user: req.user,
						stuff: popular,
					});
				});
		}
	});
});

/******************
  Flat Feed
******************/

router.get('/flat', withAuth, function(req, res, next) {
    const user_id = Object.values(req.session)[1];
    
	FeedManager.getNewsFeeds((user_id)['timeline'])
		.then(enrichActivities)
		.then(function(enrichedActivities) {
			res.render('feed', {
				location: 'feed',
				user: req.user,
				activities: enrichedActivities,
				path: req.url,
			});
		})
		.catch(next);
});

/******************
  Aggregated Feed
******************/

router.get('/aggregated_feed', withAuth, function(req, res, next) {
	
    FeedManager.getNewsFeeds((req.user.id)['timeline_aggregated'])
		.then(enrichAggregatedActivities)
		.then(function(enrichedActivities) {
			res.render('aggregated_feed', {
				location: 'aggregated_feed',
				user: req.user,
				activities: enrichedActivities,
				path: req.url,
			});
		})
		.catch(next);
});

/******************
  Notification Feed
******************/

router.get('/notification_feed/', withAuth, function(
	req,
	res,
	next
) {
	var notificationFeed = FeedManager.getNotificationFeed(req.user.id);

	notificationFeed
		.get({ mark_read: true, mark_seen: true })
		.then(function(body) {
			var activities = body.results;
			if (activities.length == 0) {
				return res.send('');
			} else {
				req.user.unseen = 0;
				return StreamBackend.enrichActivities(activities[0].activities);
			}
		})
		.then(function(enrichedActivities) {
			res.render('notification_follow', {
				lastFollower: enrichedActivities[0],
				count: enrichedActivities.length,
				layout: false,
			});
		})
		.catch(next);
});

/******************
  People
******************/

router.get('/people', withAuth, function(req, res) {
	User.find({}).lean().exec(function(err, people) {
		Follow.find({ user: req.user.id }).exec(function(err, follows) {
			if (err) return next(err);
			did_i_follow(people, follows);
			return res.render('people', {
				location: 'people',
				user: req.user,
				people: people,
				path: req.url,
				show_feed: false,
			});
		});
	});
});

/******************
  User Profile
******************/

router.get('/profile', withAuth, function(req, res, next) {
	
    FeedManager.getUserFeed(req.user.id)	
		.then(enrichActivities)
		.then(function(enrichedActivities) {
			res.render('profile', {
				location: 'profile',
				user: req.user,
				profile_user: req.user,
				activities: enrichedActivities,
				path: req.url,
				show_feed: true,
			});
		})
		.catch(next);
});

router.get('/profile/:user', withAuth, function(req, res, next) {
	User.findOne({ username: req.params.user }, function(err, foundUser) {
		if (err) return next(err);

		if (!foundUser)
			return res.send('User ' + req.params.user + ' not found.');

		FeedManager.getNewsFeeds((foundUser._id)['flat'])
			.then(enrichActivities)
			.then(function(enrichedActivities) {
				res.render('profile', {
					location: 'profile',
					user: req.user,
					profile_user: foundUser,
					activities: enrichedActivities,
					path: req.url,
					show_feed: true,
				});
			})
			.catch(next);
	});
});

/******************
  Account
******************/

router.get('/account', withAuth, function(req, res) {
	res.render('account', { user: req.user });
});

/******************
  Auth
******************/

router.get('/login', function(req, res) {
	if (req.isAuthenticated()) return res.redirect('/');

	res.render('login', { location: 'people', user: req.user });
});

router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

/******************
  Follow
******************/

router.post('/follow', withAuth, function(req, res, next) {
	User.findOne({ _id: req.body.target }, function(err, target) {
		if (target) {
			var followData = { user: req.user.id, target: req.body.target };
			var follow = new Follow(followData);
			follow.save(function(err) {
				if (err) next(err);
				res.set('Content-Type', 'application/json');
				return res.send({ follow: { id: req.body.target } });
			});
		} else {
			res.status(404).send('Not found');
		}
	});
});

router.delete('/follow', withAuth, function(req, res) {
	Follow.findOne({ user: req.user.id, target: req.body.target }, function(
		err,
		follow
	) {
		if (follow) {
			follow.remove(function(err) {
				if (err) next(err);
				res.set('Content-Type', 'application/json');
				return res.send({ follow: { id: req.body.target } });
			});
		} else {
			res.status(404).send('Not found');
		}
	});
});

/******************
  Pin
******************/

router.post('/pin', withAuth, function(req, res, next) {
	Item.findOne({ _id: req.body.item }, function(err, item) {
		console.log('item', item);
		if (item) {
			var pinData = { user: req.user.id, item: item };
			var pin = new Pin(pinData);
			pin.save(function(err) {
				if (err) next(err);
				res.set('Content-Type', 'application/json');
				return res.send({ pin: { id: req.body.item } });
			});
		} else {
			res.status(404).send('Not found');
		}
	});
});

router.delete('/pin', withAuth, function(req, res) {
	var user = req.user;
	var pinData = { user: req.user.id, item: req.body.item };

	Pin.findOne(pinData, function(err, foundPin) {
		if (foundPin) {
			foundPin.remove();
		}
	});

	res.set('Content-Type', 'application/json');
	return res.send({ pin: { id: req.body.item } });
});

/******************
  Auto Follow
******************/

router.get('/auto_follow/', withAuth, function(req, res, next) {
	var followData = { user: req.user.id, target: req.user.id };
	res.set('Content-Type', 'application/json');

	Follow.findOne(followData, function(err, foundFollow) {
		if (!foundFollow) {
			console.log('follow data', followData);
			record = new Follow(followData);
			record.save(function(err) {
				console.error(err);
				if (err) next(err);
				return res.send({ follow: { id: record._id } });
			});
		} else {
			return res.send({});
		}
	});
});

module.exports = router;