import resolve from "@rollup/plugin-node-resolve"
import multi from "@rollup/plugin-multi-entry"
import commonjs from "@rollup/plugin-commonjs"

export default {
  input: "spec/**/*.spec.js",
  output: {
    sourcemap: true,
    format: "cjs",
    name: "tests",
    file: "public/build/bundle-tests.js",
  },
  plugins: [
    multi(),
    // svelte({ css: false, dev: true }),
    resolve({
      only: [/^svelte-/],
    }),
    commonjs()
  ],
  onwarn(warning, warn) {
    if (warning.code === "UNRESOLVED_IMPORT") return
    warn(warning)
  }
}
