export class Coordinates 
{
    public get Q(): number
    {
        return this.q;
    } 

    public get R(): number
    {
        return this.q;
    } 

    public get X(): number
    {
        return this.q;
    } 

    public get Z(): number
    {
        return this.r;
    } 

    public get Y(): number
    {
        return -this.X - this.Z;
    } 

    private static readonly neighborDirections: { q:number, r:number }[] = [
        { q:1, r:0 },
        { q:1, r:-1 },
        { q:0, r:-1 },
        { q:-1, r:0 },
        { q:-1, r:1 },
        { q:0, r:1 }
    ];

    private readonly q:number;
    private readonly r:number;

    public constructor(q: number, r:number)
    {
        this.q = q;
        this.r = r;
    }

    public ToString(): string
    {
        return this.q + ", " + this.r;
    }

    public IsEquals(coordinates: Coordinates): boolean
    {
        return this.Q == coordinates.Q &&
            this.R == coordinates.R;
    }

    public IsNeighbor(coordinates: Coordinates): boolean
    {
        for (let neighborsDirection of this.GetNeighbors())
        {
            if (coordinates.IsEquals(neighborsDirection))
            {
                return true;
            }
        }

        return false;
    }

    public GetNeighbors(): Coordinates[]
    {
        return [
            new Coordinates(this.q + Coordinates.neighborDirections[0].q, this.r + Coordinates.neighborDirections[0].r),
            new Coordinates(this.q + Coordinates.neighborDirections[1].q, this.r + Coordinates.neighborDirections[1].r),
            new Coordinates(this.q + Coordinates.neighborDirections[2].q, this.r + Coordinates.neighborDirections[2].r),
            new Coordinates(this.q + Coordinates.neighborDirections[3].q, this.r + Coordinates.neighborDirections[3].r),
            new Coordinates(this.q + Coordinates.neighborDirections[4].q, this.r + Coordinates.neighborDirections[4].r),
            new Coordinates(this.q + Coordinates.neighborDirections[5].q, this.r + Coordinates.neighborDirections[5].r)
        ];
    }

    public ToPoint(size: number): { x: number, y: number}
    { 
        let x = size * 3 / 2 * this.q;
        let y = size * Math.sqrt(3) * (this.r + this.r / 2);
        return { x: x, y: -y };
    }

    public GetField(distance: number): Coordinates[]
    {
        let tiles:Coordinates[] = [];
        tiles.push(this);
        for (let dx = -distance; dx <= distance; dx++)
        {
            for (let dy = Math.max(-distance, -dx - distance); dy <= Math.min(distance, -dx + distance); dy++)
            {
                if (this.X == this.X + dx && this.Y == this.Y + dy)
                {
                    continue;
                }

                tiles.push(new Coordinates(this.X + dx, this.Y + dy));
            }
        }

        return tiles;
    }

    public GetDistance(coordinates: Coordinates)
    {
        return Math.max(Math.abs(this.X - coordinates.X), Math.abs(this.Y - coordinates.Y), Math.abs(this.Z - coordinates.Z));
    }
}