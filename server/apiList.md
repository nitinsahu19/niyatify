# APIs

## authRouter
- POST /login
- POST /signUP
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

## connectionRequestRouter
- POST /request/send/:status/:userId -> status can be interested or ignored
- POST /request/review/:status/:requestId -> here can be rejected or accepted

## userRouter
- GET /user/connections
- GET /user/requests
- get /user/feed  -> gets you profiles of other persons on platform to like or ignore
