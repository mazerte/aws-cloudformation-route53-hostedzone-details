var AWS = require('aws-sdk');

var route53 = new AWS.Route53();

var Create = function(params, reply) {
  route53.getHostedZone(params, function(err, data) {
    if (err) {
      console.error(err);
      reply(err);
    } else  {
      reply(null, data.HostedZone.Name.slice(0, -1), {
        "HostedZone.ResourceRecordSetCount": data.HostedZone.ResourceRecordSetCount,
        "HostedZone.CallerReference": data.HostedZone.CallerReference,
        "HostedZone.Config.Comment": data.HostedZone.Config.Comment || "-",
        "HostedZone.Config.PrivateZone": data.HostedZone.Config.PrivateZone,
        "HostedZone.Id": data.HostedZone.Id,
        "HostedZone.Name": data.HostedZone.Name,
        "DelegationSet.NameServers": data.DelegationSet.NameServers.join(', ')
      });
    }
  });
};

var Update = function(physicalId, params, oldParams, reply) {
  Create(params, reply);
};

var Delete = function(physicalId, params, reply) {
  reply(null, physicalId);
};

exports.Create = Create;
exports.Update = Update;
exports.Delete = Delete;
