import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

/**
 * This module contains Svg icon components
 * @module
 */

type SvgIconsProps = ComponentPropsWithoutRef<"svg">;

export function SunSvgIcon({ className = "h-6 w-6", ...props }: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${className}`}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      />
    </svg>
  );
}

export function MoonSvgIcon({
  className = "h-6 w-6",
  ...props
}: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={`${className}`}
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
      />
    </svg>
  );
}
export function DiscordSvgIcon({
  className = "h-6 w-6",
  ...props
}: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      fill="#252941"
      className={`${className}`}
      {...props}
    >
      <path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z" />
    </svg>
  );
}
export function GithubSvgIcon({
  className = "h-6 w-6",
  ...props
}: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="#252941"
      className={`${className}`}
      {...props}
    >
      <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
    </svg>
  );
}
export function TelegramSvgIcon({
  className = "h-6 w-6",
  ...props
}: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      fill="#252941"
      className={`${className}`}
      {...props}
    >
      <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 393 496 256 385 8 248 8zM363 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.7 .2-.7 .3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3 .7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7 108.4-47.2 144.6-62.3c68.9-28.6 83.2-33.6 92.5-33.8 2.1 0 6.6 .5 9.6 2.9a10.5 10.5 0 0 1 3.5 6.7A43.8 43.8 0 0 1 363 176.7z" />
    </svg>
  );
}
export function EllipsesVerticalSvgIcon({
  className = "h-6 w-6",
  ...props
}: SvgIconsProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 512"
      className={`${className} fill-foreground`}
      {...props}
    >
      <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
    </svg>
  );
}
export function MetaBlogLogoSvgIcon({ className, ...props }: SvgIconsProps) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 219 221"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${cn(className, " ")}`}
      {...props}
    >
      <mask
        id="mask0_106_49"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="219"
        height="221"
      >
        <path d="M218.646 0H0V220.933H218.646V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_106_49)">
        <path
          d="M186.511 188.407C207.128 167.711 218.686 139.678 218.646 110.466C218.624 108.663 217.893 106.941 216.61 105.674C215.327 104.406 213.597 103.696 211.794 103.696C209.99 103.696 208.26 104.406 206.977 105.674C205.694 106.941 204.963 108.663 204.941 110.466C204.97 136.066 194.836 160.632 176.766 178.766C167.994 187.772 157.507 194.93 145.923 199.818C134.34 204.705 121.895 207.223 109.323 207.223C96.7508 207.223 84.3059 204.705 72.7226 199.818C61.1393 194.93 50.6522 187.772 41.88 178.766C23.8342 160.614 13.7052 136.058 13.7052 110.462C13.7052 84.8654 23.8342 60.3094 41.88 42.157C50.6011 33.2203 61.0095 26.1037 72.5017 21.2198C83.9939 16.336 96.3413 13.782 108.828 13.706C111.494 13.7895 114.022 14.9114 115.873 16.8323C117.724 18.7531 118.751 21.3211 118.735 23.9885C118.72 26.6559 117.663 29.2117 115.79 31.111C113.917 33.0102 111.376 34.1025 108.709 34.155C108.462 34.1555 108.215 34.1692 107.97 34.196C88.9727 34.8078 70.9474 42.74 57.663 56.334C43.6337 70.4568 35.7599 89.5554 35.7599 109.462C35.7599 129.369 43.6337 148.467 57.663 162.59C64.5168 169.611 72.7055 175.19 81.7474 178.999C90.7892 182.808 100.502 184.77 110.313 184.77C120.124 184.77 129.837 182.808 138.879 178.999C147.92 175.19 156.109 169.611 162.963 162.59C177.014 148.482 184.891 129.374 184.863 109.462C184.892 106.326 184.299 103.214 183.119 100.308C181.938 97.4025 180.194 94.7591 177.986 92.5311C175.778 90.303 173.151 88.5344 170.256 87.3275C167.361 86.1205 164.256 85.4991 161.119 85.4991C157.982 85.4991 154.877 86.1205 151.982 87.3275C149.087 88.5344 146.46 90.303 144.252 92.5311C142.044 94.7591 140.3 97.4025 139.119 100.308C137.939 103.214 137.346 106.326 137.375 109.462C137.375 109.662 137.388 109.85 137.404 110.042C137.388 110.234 137.375 110.426 137.375 110.622C137.42 116.09 135.839 121.448 132.833 126.017C129.828 130.585 125.533 134.157 120.494 136.281C115.455 138.404 109.898 138.983 104.53 137.944C99.1611 136.904 94.2223 134.294 90.3398 130.443C86.4573 126.592 83.8062 121.675 82.7229 116.315C81.6396 110.955 82.1729 105.394 84.2551 100.338C86.3373 95.2812 89.8746 90.9573 94.4181 87.9145C98.9617 84.8717 104.307 83.2472 109.775 83.247C110.682 83.258 111.582 83.0888 112.423 82.7494C113.264 82.4099 114.029 81.9069 114.674 81.2695C115.319 80.6321 115.832 79.873 116.181 79.0361C116.531 78.1993 116.711 77.3014 116.711 76.3945C116.711 75.4876 116.531 74.5897 116.181 73.7529C115.832 72.916 115.319 72.1569 114.674 71.5195C114.029 70.8821 113.264 70.3791 112.423 70.0396C111.582 69.7002 110.682 69.531 109.775 69.542C101.66 69.587 93.7397 72.0347 87.014 76.576C80.2883 81.1174 75.0583 87.5491 71.9839 95.0596C68.9096 102.57 68.1286 110.823 69.7394 118.777C71.3503 126.731 75.2808 134.029 81.0352 139.752C86.7895 145.474 94.1099 149.364 102.073 150.931C110.035 152.497 118.284 151.67 125.777 148.554C133.27 145.438 139.673 140.173 144.177 133.422C148.681 126.671 151.084 118.737 151.084 110.622C151.084 110.422 151.071 110.234 151.055 110.042C151.071 109.85 151.084 109.658 151.084 109.462C151.057 108.127 151.297 106.8 151.79 105.558C152.282 104.317 153.018 103.186 153.952 102.233C154.887 101.279 156.003 100.521 157.234 100.004C158.465 99.487 159.788 99.2206 161.123 99.2206C162.458 99.2206 163.781 99.487 165.012 100.004C166.243 100.521 167.359 101.279 168.294 102.233C169.228 103.186 169.964 104.317 170.456 105.558C170.949 106.8 171.189 108.127 171.162 109.462C171.18 125.764 164.727 141.406 153.22 152.953C147.641 158.685 140.97 163.24 133.601 166.351C126.232 169.462 118.314 171.064 110.315 171.064C102.317 171.064 94.3993 169.462 87.0302 166.351C79.6612 163.24 72.9902 158.685 67.411 152.953C55.9195 141.396 49.4692 125.76 49.4692 109.462C49.4692 93.164 55.9195 77.5283 67.411 65.971C72.9946 60.2464 79.6658 55.6954 87.0329 52.5853C94.4 49.4751 102.314 47.8686 110.311 47.86C110.926 47.8583 111.538 47.7736 112.131 47.608C117.965 46.7133 123.262 43.6962 127.008 39.1356C130.754 34.5749 132.684 28.7918 132.428 22.8957C132.172 16.9995 129.747 11.4055 125.62 7.18678C121.493 2.96803 115.954 0.421605 110.065 0.0359955C109.819 0.00920053 109.571 -0.00448578 109.323 -0.00500488C109.185 -0.00500488 109.048 -0.00500488 108.91 -0.00500488C108.842 -0.00500488 108.776 -0.00500488 108.71 -0.00500488C108.644 -0.00500488 108.576 0.00298962 108.51 0.00498962C94.264 0.117025 80.1811 3.04789 67.0732 8.62861C53.9652 14.2093 42.0917 22.3295 32.137 32.521C11.554 53.2388 0.00189209 81.2573 0.00189209 110.462C0.00189209 139.666 11.554 167.684 32.137 188.402C42.1837 198.697 54.1884 206.879 67.4444 212.464C80.7005 218.05 94.9401 220.928 109.325 220.928C123.71 220.928 137.949 218.05 151.206 212.464C164.462 206.879 176.466 198.697 186.513 188.402L186.511 188.407Z"
          fill="url(#paint0_linear_106_49)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_106_49"
          x1="31.7053"
          y1="188.009"
          x2="170.648"
          y2="52.0355"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#BE22FF" />
          <stop offset="0.99" stopColor="#2563E5" />
        </linearGradient>
      </defs>
    </svg>
  );
}
