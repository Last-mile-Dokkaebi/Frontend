module.exports = {
  async rewirtes() {
    if (process.env.NODE_ENV != 'production') {
      return [
        {
          source: '/:path*',
          destination: process.env.NEXT_PUBLIC_BACKEND_DEVELOP + '/:path*',
        }
      ]
    }
  }
}