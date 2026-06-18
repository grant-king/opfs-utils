import assert from 'node:assert'
import { import_test } from 'opfs-utils'
import test from 'node:test'

test('import test', (t) => {
    const result = import_test()
    assert.strictEqual(result, true)
})

test('help test', (t) => {
    console.log("\n::::\n")
    console.log("Thank you for using opfs-utils. These functions need access to the browser's navigator interface... I don't know how to programmatically test them within Node. Please help.")
    console.log("")
    console.log("Contribute on GitHub: see readme for repo link")
    console.log("\n::::\n")
    assert.strictEqual(1, 1)
})

test('manual test', (t) => {
    console.log("\n::::\n")
    console.log("I test these utilities in the browser. If you encounter any issues please let me know.")
    console.log("")
    console.log("Contribute on GitHub: see readme for repo link")
    console.log("\n::::\n")
    assert.strictEqual(1, 1)
})

