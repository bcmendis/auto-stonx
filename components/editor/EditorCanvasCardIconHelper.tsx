'use client'
import React from 'react'
import {
  CircuitBoard,
  MousePointerClickIcon,
  RotateCcw,
  Timer,
  Zap,
  Eye,
  Wallet,
  Handshake,
  Split,
} from 'lucide-react'
import { EditorCanvasTypes } from '@/lib/types'

type Props = { type: string }

const EditorCanvasCardIconHelper = ({ type }: Props) => {
  switch (type) {
    case 'Watch Price':
      return (
        <Eye
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Condition':
      return (
        <Split
          className="flex-shrink-0 rotate-180"
          size={30}
        />
      )
    case 'AI':
      return (
        <CircuitBoard
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Restart':
      return (
        <RotateCcw
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Trigger':
      return (
        <MousePointerClickIcon
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Action':
      return (
        <Zap
          className="flex-shrink-0"
          size={30}
        />
      )
    case 'Wait':
      return (
        <Timer
          className="flex-shrink-0"
          size={30}
        />
      )
      case 'Buy':
      return (
        <Wallet
          className="flex-shrink-0"
          size={30}
        />
      )
      case 'Sell':
      return (
        <Handshake
          className="flex-shrink-0"
          size={30}
        />
      )
    default:
      return (
        <Zap
          className="flex-shrink-0"
          size={30}
        />
      )
  }
}

export default EditorCanvasCardIconHelper