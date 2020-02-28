import {Deserializable} from './deserializable.model';


export class CategoryModel implements Deserializable{
    name: string;
    description: string;
    imageUrl?: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
