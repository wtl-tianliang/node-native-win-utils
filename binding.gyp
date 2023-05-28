{
    "targets": [
        {
            "target_name": "node-native-win-utils",
            "sources": ["src/cpp/main.cpp"],
            "openssl_flips": "",
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
                "src/cpp"
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "libraries": ["dwmapi.lib", "windowsapp.lib"],
            "defines": ["NAPI_DISABLE_CPP_EXCEPTIONS"],
            "conditions": [
                ["OS=='win'", {
                    "defines": [
                        "_CRT_SECURE_NO_WARNINGS"
                    ],
                    "msvs_settings": {
                        "VCCLCompilerTool": {
                            "AdditionalOptions": ["/EHsc"]
                        }
                    }
                }]
            ],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "defines": ["NAPI_CPP_EXCEPTIONS"]
        }
    ]
}
