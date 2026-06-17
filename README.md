# opfs-utils

opfs-utils is a JavaScript package with utilities for working with the OPFS origin private file system.

This package isn't to a stable version yet. Please use it carefully.

opfs-utils does not have any dependencies.

The goal of this package is to help web developers utilize the power of OPFS as quickly and easily as possible when their energy for learning is being spread thin.

For production, please consider writing your own custom OPFS utilities package that uses the built-in methods and can be made to suit your particular needs.

Contributions are welcome! If you do something and think that the changes would be useful to everyone, please do submit a PR. Or fork your own thing and let me know about your discoveries.

---

:|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|:

:|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|:

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

* `...getFileHandle()`

```js
// log the handle for a new file named demo_file.txt

const opfs_root = await navigator.storage.getDirectory()
const file_handle = await opfs_root.getFileHandle(
    "demo_file.txt", { create: true }
)

console.log(file_handle)

// expected output:
// 


```

* `...createWritable()` and `...getFile()`

```js
// write text to demo_file.txt in the OPFS root directory 
// and log the file object

const opfs_root = await navigator.storage.getDirectory()
const file_handle = await opfs_root.getFileHandle(
    "demo_file.txt", { create: true }
)

const text = "Hello OPFS"
const text_encoder = new TextEncoder()
const data_buffer = text_encoder.encode(text)
const file_writeable = await file_handle.createWritable()
await file_writeable.write(data_buffer)
await file_writeable.close()

const file = await file_handle.getFile()

console.log(file)

// expected output:
// 


```

* `...createWritable()` and `...getFile()` (to copy bytes)

```js
// copy demo_file.txt to demo_file_2.txt in the OPFS root directory 
// and then log the directory values

const opfs_root = await navigator.storage.getDirectory()

const file_handle_1 = await opfs_root.getFileHandle(
    "demo_file.txt", { create: true }
)

const file_handle_2 = await opfs_root.getFileHandle(
    "demo_file_copy.txt", { create: true }
)

const text = "Hello OPFS"
const text_encoder = new TextEncoder()
const data_buffer = text_encoder.encode(text)
const file_writeable_1 = await file_handle.createWritable()
await file_writeable_1.write(data_buffer)
await file_writeable_1.close()
const file_1 = await file_handle_1.getFile()

const file_writeable_2 = await file_handle_2.createWritable()
await file_writeable_2.write(await file_1.arrayBuffer())
await file_writeable_2.close()

console.log(await opfs_root.values())

// expected output:
// 


```

---

:|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|:

:|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|::|:|:|:

---

## Functions from opfs-utils

opfs-utils package includes the following functions that compose the built-in OPFS methods shown above.

* get_opfs_info

* get_directory_handle

* get_file_handle

* store_text

* store_bytes

* get_directory_contents_json

* copy_full_directory

### Function Definitions

#### get_opfs_info :: get storage info in a flat object with descriptive keys

```js
async function get_opfs_info() 
=> 
{
    "storage_total": quota,
    "storage_used": usage,
    "usage_cache": usageDetails.caches,
    "usage_filesystem": usageDetails.fileSystem,
}
```

#### get_directory_handle :: get a `FileSystemDirectoryHandle` object using a list of directory name strings

```js
async function get_directory_handle(
    directory_list=["dirname", "subdir"]
    ) 
=> 
FileSystemDirectoryHandle
```

#### get_file_handle :: get a `FileSystemFileHandle` object using a list of directory name strings and a file name string

```js
async function get_file_handle(
    directory_list=["for", "example"], 
    filename="ie.txt"
    )
=>
FileSystemFileHandle
```

#### store_text :: store text using a `FileSystemFileHandle` object and a string of text

```js
async function store_text(
    file_handle=FileSystemFileHandle, 
    text="Hello text"
    )
=>
FileSystemFileHandle
```

```js
async function store_bytes(
    file_handle=FileSystemFileHandle, 
    bytes=ArrayBuffer||Uint8Array,
    )
=>
FileSystemFileHandle
```

```js
async function get_directory_contents_json(
    file_handle=FileSystemFileHandle, 
    text="Hello text"
    )
=>
{
    "file_name_1": File object,
    "directory_name_I": {
        "file_name_2": File object,
        "file_name_3": File object,
    },
    "directory_name_II": {
        "file_name_4": File object,
        "subdirectory": {
            "file_name_5": File object,
            "file_name_6": File object,
        },
    },
}
```

```js
async function copy_full_directory(
    source_dir_handle=FileSystemFileHandle, 
    output_dir_handle=FileSystemFileHandle, 
    )
=>
none
```
