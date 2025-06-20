import {useDrop} from "react-dnd";
import {Driver} from "../../models/Driver.ts";
import {DriverCell} from "./DriverCell.tsx";

type PositionCellProps = {
    betPosition: any,
    occupiedByDriver?: Driver,
    onDrop: (driver: any, position: any) => void,
    onRemove: (driver: Driver) => void,
}

export const PositionCell = ({betPosition, occupiedByDriver, onDrop, onRemove }: PositionCellProps) => {

    const [{isOver, canDrop}, drop] = useDrop(() => ({
        accept: 'driver',
        drop: (item) => {
            onDrop(item, betPosition);
        },
        canDrop: () => !occupiedByDriver,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))

    return (
        <div
            ref={drop}
            key={betPosition.id}
        >
            {!occupiedByDriver ? (
                <div className={` ${isOver ? 'bg-green-200' : 'bg-white'} ${canDrop ? 'border-blue-500' : 'bg-gray-500' } border-2 border-dashed rounded-xl p-2 border`}>
                    <h3 className="text-lg font-semibold text-gray-800 text-center">
                        {betPosition.id}
                    </h3>
                </div>
            ): (
                <DriverCell onRemove={onRemove} driver={occupiedByDriver} />
            )}
        </div>


    )
}