import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string // エラーメッセージ（オプショナル）
}

const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <div>
      <input
        className={`bg-gray-50 border-[0.5px] text-text-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className || ''
          } ${error ? 'border-red-500' : 'border-text-900'}`}
        {...props}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}
//error && 　→ 左辺 error が存在する（truthy）場合のみ、次の部分（エラーメッセージを表示する <p> 要素）がレンダリングされる。errorがfalsy（undefined,空文字列）ならここはレンダリングされない。
export default Input
