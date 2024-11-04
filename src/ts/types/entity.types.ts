export class Entity {
  private _id: number;
  private _name: string;
  private _description: string;
  private _type: string;
  private _isArchived: boolean;
  private _addedOn: Date;

  constructor(
    id: number,
    name: string,
    description: string,
    type: string,
    isArchived: boolean,
    addedOn: Date
  ) {
    (this._id = id),
      (this._name = name),
      (this._description = description),
      (this._type = type),
      (this._isArchived = isArchived),
      (this._addedOn = addedOn);
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name
  }
}
