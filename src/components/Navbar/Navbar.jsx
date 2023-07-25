import React from "react";

export default function Navbar (){
    return (
        <div class="m-0 h-10">
          <header class="w-full bg-zinc-800 fixed">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <a href="/" >
                  <p class="no-underline">RocketParts</p>
                </a>
              </div>
              <div class="flex items-center gap-8">
              </div>
            </div>
          </header>
        </div>
    )
}