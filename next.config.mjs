/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'eduwise.s3.ap-south-1.amazonaws.com', 'firebasestorage.googleapis.com'],
    },
};

export default nextConfig;
