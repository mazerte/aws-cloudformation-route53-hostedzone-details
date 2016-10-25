var CfnLambda = require('cfn-lambda');
var AWS = require('aws-sdk');

var Details = require('./lib/details');

function Route53DetailsHandler(event, context) {
  var Route53Details = CfnLambda({
    Create: Details.Create,
    Update: Details.Update,
    Delete: Details.Delete,
    SchemaPath: [__dirname, 'src', 'schema.json']
  });
  // Not sure if there's a better way to do this...
  AWS.config.region = currentRegion(context);

  return Route53Details(event, context);
}

function currentRegion(context) {
  return context.invokedFunctionArn.match(/^arn:aws:lambda:(\w+-\w+-\d+):/)[1];
}

exports.handler = Route53DetailsHandler;
