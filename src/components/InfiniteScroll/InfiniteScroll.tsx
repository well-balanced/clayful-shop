import React from 'react'
import { Waypoint } from 'react-waypoint'

interface InfiniteScrollProps {
  loadMore: (e: any) => void
  threshold?: string
  hasMore: boolean
  children: React.ReactNode
}

const InfiniteScroll = ({
  loadMore,
  threshold,
  hasMore,
  children,
}: InfiniteScrollProps) => {
  return (
    <div>
      {children}
      {hasMore && <Waypoint onEnter={loadMore} bottomOffset={threshold} />}
    </div>
  )
}

export default InfiniteScroll
