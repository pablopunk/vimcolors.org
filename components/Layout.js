import React from 'react'

export default ({ children }) => (
  <div>
    <main>{children}</main>
    <style jsx>{`
      main {
        max-width: 700px;
        margin: 0 auto;
        padding: 1em;
        font-family: 'SF Mono', Menlo, monospace;
      }
    `}</style>
  </div>
)
