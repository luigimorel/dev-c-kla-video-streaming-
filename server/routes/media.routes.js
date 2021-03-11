router.route('/api/media/new/:userId')
    .post(authCtrl.requireSignin, mediaCtrl.create)
router.param('userId', userCtrl.userByID)