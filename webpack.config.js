const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // Punto de entrada
    output: {
        filename: 'main.js', // Nombre del archivo de salida
        path: path.resolve(__dirname, 'dist'), // Carpeta de salida
    },
    mode: 'development', // Modo de desarrollo
    watch: true,
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Plantilla HTML
            filename: 'index.html', // Nombre del archivo HTML generado
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i, // Para archivos CSS
                use: ['style-loader', 'css-loader'], // Los loaders a usar
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|svg)$/i, // Para archivos de imagen
                type: 'asset/resource', // Manejo de archivos
            },
            {
                test: /\.(?:js|mjs|cjs)$/, // Para archivos JavaScript
                exclude: /node_modules/, // Excluir la carpeta node_modules
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }] // Preset para convertir JS moderno
                        ]
                    }
                }
            }
        ]
    }
};
