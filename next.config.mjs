/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com', 'eduwise.s3.ap-south-1.amazonaws.com', 'firebasestorage.googleapis.com', "ec2-13-201-3-176.ap-south-1.compute.amazonaws.com"],
    },
    trailingSlash: true,
};

export default nextConfig;
