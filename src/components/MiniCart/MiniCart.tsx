import MiniCartItem from './MiniCartItem'

interface MiniCartProps {
  items: any[]
  setItems: (arg: any) => void
}

const MiniCart = ({ items, setItems }: MiniCartProps) => {
  return (
    <div>
      {items.map((options, idx, items) => (
        <MiniCartItem
          options={{ ...options, quantity: 1 }}
          items={items}
          setItems={setItems}
          key={idx}
        />
      ))}
    </div>
  )
}

export default MiniCart
