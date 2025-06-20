import {Driver} from "../../models/Driver.ts";
import {useDrag} from "react-dnd";

type DriverCellProps = {
    driver: Driver;
    onRemove?: (driver: Driver) => void;
}

export const DriverCell = ({driver, onRemove}: DriverCellProps) => {
    const [,drag] = useDrag(() => ({
        type: 'driver',
        item: driver,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    }))

    const handleClick = () => {
        if (onRemove) {
            onRemove(driver);
        }
    };

    return (
        <div ref={drag} className="cursor-move bg-white rounded-lg shadow-md p-2 border border-gray-200 hover:shadow-lg transition-shadow" onClick={handleClick}>
            <h3 className="text-lg font-semibold text-gray-800 text-center">
                {driver.givenName} {driver.familyName}
            </h3>
        </div>
    )
}