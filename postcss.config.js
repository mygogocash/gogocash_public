// postcss.config.js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: {
      preset: [
        'default',
        {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          mergeLonghand: false, // ❌ กันไม่ให้รวม background-* เป็น shorthand
          convertValues: false, // ❌ กันไม่ให้ rgba()/color ถูก optimize จนเพี้ยน
          colormin: false, // ❌ กันไม่ให้ minify สีจนทับ tailwind
        },
      ],
    },
  },
};
