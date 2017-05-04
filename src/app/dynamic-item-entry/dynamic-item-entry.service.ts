import {
    Injectable, Component, Input, NgModule, ComponentFactory, Compiler, Inject,
    ModuleWithComponentFactories
} from "@angular/core";
import { IDyanmicItemEntry } from "./dynamic-item-entry-interface";

/**
 * This service creates runtime module for dynamic item entry injection.
 */

@Injectable()
export class DynamicItemEntryService {


    constructor(@Inject(Compiler) protected compiler: Compiler) {

    }

    /**
     * cachedFactory caches compiled modules.
     * @type {{}}
     */
    private cachedFactory: {[templateKey: string]: ComponentFactory<IDyanmicItemEntry>} = {}


    /**
     * This method creates runtime Module
     * @param templateString
     * @param stylesString
     */
    public createItemEntryModule(templateString: string, stylesString: string) {

        let factory = this.cachedFactory[templateString];

        if (factory) {
            return new Promise((resolve) => {
                resolve(factory);
            })
        }


        let component = this.createItemEntryDynamicComponent(templateString, stylesString);
        let module = this.createItemEntryDynamicModule(component);

        return new Promise((resolve) => {
            this.compiler.compileModuleAndAllComponentsAsync(module)
                .then((moduleWithComponentFactories: ModuleWithComponentFactories<any>) => {
                    let factory = moduleWithComponentFactories.componentFactories.find((x: any) => x.selector === 'ie');
                    console.log("Factory:" + factory);
                    this.cachedFactory[templateString] = factory;
                    resolve(factory);
                });
        });

    }


    /**
     * This method create new Component dynamically.
     * It takes template and styles parameters.
     * @param templateString
     * @param stylesString
     * @returns {DynamicComponent}
     */
    private createItemEntryDynamicComponent(templateString: string, stylesString: string) {

        @Component({
            selector: 'ie',
            template: templateString,
            styles: [stylesString]
        })
        class DynamicComponent implements IDyanmicItemEntry {
            @Input() public ItemValuesObject: any;
        }
        return DynamicComponent;
    }

    /**
     * This method created runtime module for dynamic item entry.
     * @param component
     * @returns {DynamicModule}
     */
    private createItemEntryDynamicModule(component: any) {
        @NgModule({
            declarations: [component]
        })
        class DynamicModule {

        }
        return DynamicModule;

    }

}