import * as ort from 'onnxruntime-web'

// 🔑 חייב לרוץ לפני כל removeBackground
ort.env.wasm.numThreads = 1
ort.env.wasm.simd = false