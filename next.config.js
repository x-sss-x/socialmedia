/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:[{
    domains:["fakestoreapi.com"],
    deviceSizes:{
      "(max-width: 640px)":{
        width:640,
        height:640
        },
        
      
    }
  }]
}

module.exports = nextConfig
