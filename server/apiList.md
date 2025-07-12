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
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejested/:requestId

## userRouter
- GET /user/connections
- GET /user/requests
- get /user/feed  -> gets you profiles of other persons on platform to like or ignore
