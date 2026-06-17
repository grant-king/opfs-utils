import assert from 'node:assert'
import { get_opfs_info } from '../index.js'
import test from 'node:test'

test('help test', (t) => {
    console.log("\n::::\n")
    console.log("Thank you for using opfs-utils. These functions need access to the browser's navigator interface... I don't know how to programmatically test them within Node. Please help.")
    console.log("")
    console.log("Contribute on GitHub: https://github.com/grant-king/opfs-utils")
    console.log("\n::::\n")
    assert.strictEqual(1, 1)
})

test('manual test', (t) => {
    console.log("\n::::\n")
    console.log("I thuroughly test these modules in the browser. If you encounter any issues please let me know.")
    console.log("")
    console.log("Contribute on GitHub: https://github.com/grant-king/opfs-utils")
    console.log("\n::::\n")
    assert.strictEqual(1, 1)
})

