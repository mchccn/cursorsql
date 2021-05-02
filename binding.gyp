{
    "targets": [
        {
            "target_name": "core",
            "cflags!": [ "-fno-exceptions" ],
            "cflags_cc!": [ "-fno-exceptions" ],
            "sources": [
                "src/core/main.cpp",
            ],
            "include_dirs": [],
            "libraries": [],
            "dependencies": [],
            "defines": [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ]
        }
    ]
}
