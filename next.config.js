module.exports = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
    deviceSizes: [150, 250, 350, 640, 750, 828, 1080, 1200],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
