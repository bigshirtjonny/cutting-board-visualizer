const path = require('path');

module.exports = {
    entry: './src/index.js', // Entry point for your React app
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory for bundled files
        filename: 'bundle.js', // Output bundle file name
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Match JavaScript and JSX files
                exclude: /node_modules/, // Exclude dependencies
                use: {
                    loader: 'babel-loader', // Transpile modern JS/JSX
                    options: {
                        presets: ['@babel/preset-react'], // Use React preset
                    },
                },
            },
            {
                test: /\.css$/, // Match CSS files
                use: ['style-loader', 'css-loader', 'postcss-loader'], // Load and process CSS with PostCSS (for Tailwind CSS)
            },
        ],
    },
    devServer: {
        static: path.resolve(__dirname, 'public'), // Serve static files from 'public' folder
        compress: true, // Enable gzip compression
        port: 9000, // Development server port
        open: true, // Automatically open the app in the browser
    },
    resolve: {
        extensions: ['.js', '.jsx'], // Resolve these extensions automatically
    },
};
