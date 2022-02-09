import { createArea } from "./createArea";
import { getArea } from "./getArea";
import { deleteArea } from "./deleteArea";
import { updateArea } from "./updateArea";
import { listAreas } from "./listAreas";

export = {
    "/area": {
        ...createArea
    },
    "/area/list": {
        ...listAreas
    },
    "/area/{id}": {
        ...getArea,
        ...updateArea,
        ...deleteArea
    }
};