module.exports = async () => {
  const proxies = [];
  const disabledProxies = [];

  const serverProtocol = process.env.SERVER_PROTOCOL;
  const serverIP = process.env.SERVER_IP;
  const serverPort = process.env.SERVER_PORT;
  const serverPrefix = process.env.SERVER_PREFIX;

  if (serverProtocol && serverIP && serverPort) {
    const serverURL = `${serverProtocol}://${serverIP}:${serverPort}`;
    const serverRESTAPIEndpoint = `${serverURL}${serverPrefix}`;
    const serverProxyURL = '/api';

    proxies.push({
      source: `${serverProxyURL}/:path*`,
      destination: `${serverRESTAPIEndpoint}/:path*`,
    });
  } else {
    disabledProxies.push('server');
  }

  const cmsProtocol = process.env.CMS_PROTOCOL;
  const cmsIP = process.env.CMS_IP;
  const cmsPort = process.env.CMS_PORT;

  if (cmsProtocol && cmsIP && cmsPort) {
    const cmsURL = `${cmsProtocol}://${cmsIP}:${cmsPort}`;
    const cmsGraphQLEndpoint = `${cmsURL}/graphql`;
    const cmsProxyURL = '/api/cms';

    proxies.push(
      {
        source: `${cmsProxyURL}/uploads/:path*`,
        destination: `${cmsURL}/uploads/:path*`,
      },
      {
        source: `${cmsProxyURL}/:path*`,
        destination: `${cmsGraphQLEndpoint}/:path*`,
      },
    );
  } else {
    disabledProxies.push('cms');
  }

  if (disabledProxies.length) {
    console.warn(
      'Some proxies were not enabled. Fix by providing urls in .env file.',
    );
    console.warn('Disabled proxies:', disabledProxies.join(', '));
  }

  return proxies;
};
