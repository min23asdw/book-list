// next.config.js
module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/pantip/:path*',
          destination: 'https://pantip.com/:path*', // Proxy to external API
        },
      ];
    },
  };
  