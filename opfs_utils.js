/**
 * These are some useful utilites for working with the OPFS
 */

export function import_test(){
    return true
}

export async function get_opfs_info() {
    const storage_info = await navigator.storage.estimate()
    const info = {
        "storage_total": storage_info.quota,
        "storage_used": storage_info.usage,
        "usage_cache": storage_info.usageDetails.caches,
        "usage_filesystem": storage_info.usageDetails.fileSystem,
    }
    return info
}

export async function get_directory_handle(directory_list) {
    const opfs_root = await navigator.storage.getDirectory()
    var current_handle = opfs_root
    for (const directory_name of directory_list) {
        current_handle = await current_handle.getDirectoryHandle(
            directory_name, { create: true }
        )
    }
    return current_handle
}

export async function get_file_handle(directory_list, filename) {
    const directory_handle = await get_directory_handle(directory_list)
    const file_handle = await directory_handle.getFileHandle(
        filename, { create: true }
    )
    return file_handle
}

export async function store_text(file_handle, text) {
    //console.log("Storing text to handle", file_handle, text)
    const file_writeable = await file_handle.createWritable()
    const text_encoder = new TextEncoder()
    const data_buffer = text_encoder.encode(text)
    await file_writeable.write(data_buffer)
    await file_writeable.close()
    return file_handle
}

export async function store_bytes(file_handle, bytes) {
    //console.log("Storing bytes", directory_list, filename, bytes)
    const file_writeable = await file_handle.createWritable()
    await file_writeable.write(bytes)
    await file_writeable.close()
    return file_handle
}

export async function get_directory_contents_json(directory_handle) {
    const directory_representation = {}
    for await (const entry of directory_handle.values()) {
        //console.log("directory entry", entry)
        if (entry.kind == 'file') {
            directory_representation[entry.name] = await entry.getFile()
        } else if (entry.kind == 'directory') {
            directory_representation[entry.name] = await get_directory_contents_json(entry)
        }
    }
    return directory_representation
}

export async function copy_full_directory(source_dir_handle, output_dir_handle) {
    // recursively copy all files from source_dir_handle to output_dir_handle
    // while maintaining directory structure
    for await (const entry of source_dir_handle.values()) {
        if (entry.kind === 'file') {
            const new_file_handle = await output_dir_handle.getFileHandle(entry.name, { create: true })
            const file_writeable = await new_file_handle.createWritable()
            const file_data = await entry.getFile()
            await file_writeable.write(await file_data.arrayBuffer())
            await file_writeable.close()
        } else if (entry.kind === 'directory') {
            const new_dir_handle = await output_dir_handle.getDirectoryHandle(entry.name, { create: true })
            await copy_full_directory(entry, new_dir_handle)
        }
    }
}

