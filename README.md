# opfs-utils

opfs-utils is a JavaScript package with utilities for working with the OPFS origin private file system.

This package isn't to a stable version yet. Please use it carefully.

opfs-utils does not have any dependencies.

The goal of this package is to help web developers utilize the power of OPFS as quickly and easily as possible when their energy for learning is being spread thin.

For production, please consider writing your own custom OPFS utilities package that uses the built-in methods and can be made to suit your particular needs.

Contributions are welcome! If you do something and think that the changes would be useful to everyone, please do submit a PR. Or fork your own thing and let me know about your discoveries.

---

:|:|:|::|:|:|::|:|:|::|:|:|:

:|:|:|::|:|:|::|:|:|::|:|:|:

---

## Introduction

### Origin Private File System (OPFS) primer

The web's File System API extends device file management capabilities to the web browser. The OPFS is a powerful storage endpoint managed by the client's browser that is easily accessible through its low-level web APIs.

Here are some important characteristics of the OPFS:

* **Operations within the OPFS are fast and do not involve any user permissions.**

* The OPFS is private to the origin of the page where the interfaces are called.

* The contents of this storage are not visible to the user.

* The capacity is subject to browser storage quota restrictions.

* The OPFS interfaces provide access to an extremely performant type of file.

To read more about the OPFS, see [MDN's OPFS reference](https://developer.mozilla.org/en-US/docs/Web/API/File_System_API/Origin_private_file_system)

You can utilize the power of the OPFS by employing a few built-in JavaScript methods.

### Working with OPFS using built-in methods

* `navigator.storage.estimate()`

```js
// Log information about the origin's private browser storage usage

const storage_info = await navigator.storage.estimate()
console.log(storage_info)

// expected output:
// 

```

* `navigator.storage.getDirectory()`

```js
// log the OPFS root directory

const opfs_root = await navigator.storage.getDirectory()
console.log(opfs_root)

// expected output:
// 

```

* `...getDirectoryHandle()`

```js
// log the handle for a new nested directory

const opfs_root = await navigator.storage.getDirectory()
current_handle = await opfs_root.getDirectoryHandle(
    "demo", { create: true }
)

console.log(current_handle)

    
// expected output:
// 

```

* `...getDirectoryHandle()` (for a nested subdirectory)

```js
// log the handle for a new double-nested directory

const directory_list = ['demo', 'subdirectory']
const opfs_root = await navigator.storage.getDirectory()
var current_handle = opfs_root
for (const directory_name of directory_list) {
    current_handle = await current_handle.getDirectoryHandle(
        directory_name, { create: true }
    )
}
console.log(current_handle)

// expected output:
// 


```
