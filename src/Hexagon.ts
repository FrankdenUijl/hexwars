import { HexCoordinates } from "./HexCoordinates";

export class Hexagon
{
    private get Coordinates(): HexCoordinates
    {
        return this.coordinates;
    }

    private coordinates: HexCoordinates;

    public Initialization(coordinates: HexCoordinates)
    {
        this.coordinates = coordinates;
    }


}