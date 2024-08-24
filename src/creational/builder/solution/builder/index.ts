import { SimpleBuilder } from "./internal/builder";
import { BuilderDirector } from "./internal/director";
import { IBuilder, IBuilderDirector } from "./internal/interface";


const builder: IBuilder = new SimpleBuilder();
const director: IBuilderDirector = new BuilderDirector(builder);
const service = director.buildService();
service.doBusiness();