import React from "react"
import { PropsWithChildren } from "react"


export default function ErrorMessage({children} : PropsWithChildren) {
  return (
    <div className="text-center my-4 bg-error text-white font-bold p-3 uppercase rounded border-2 border-header-bg">
        {children}
    </div>
  )
}
