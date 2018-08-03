const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('dev'));

app.use('/', express.static("public"));
app.use('/listing/:listingId', express.static("public"));

// details
app.use(
  "/api/details/:listingId",
  proxy({ target: "http://ec2-54-200-238-109.us-west-2.compute.amazonaws.com:80" })
);

app.use(
  "/api/details/:listingId/highlights/:highlightId",
  proxy({ target: "http://ec2-54-200-238-109.us-west-2.compute.amazonaws.com:80" })
);

// reviews
app.use(
  "/reviews/:id",
  proxy({ target: "http://ec2-18-216-90-61.us-east-2.compute.amazonaws.com:80" })
);

// bookings
app.use(
  "/api/listings/:listingId",
  proxy({ target: "http://ec2-13-59-22-40.us-east-2.compute.amazonaws.com:80" })
);

app.use(
  "/api/submit",
  proxy({ target: "http://ec2-13-59-22-40.us-east-2.compute.amazonaws.com:80" })
);

app.listen(port, () => { console.log(`server running on port: ${port}`); });


