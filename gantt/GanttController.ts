/// <reference path="../references.ts" />

module app {

    import ng = angular;
    import Project = Model.Project;
    import Summary = Model.Summary;
    import Schedulable = Model.Schedulable;
    import Task = Model.Task;
    import ProjectGenerator = Util.ProjectGenerator;
    import ProjectDrawer = View.ProjectDrawer;
    import Utils = View.Utils;
    import ProjectService = app.ProjectService;

    export class GanttCtrl {

        zoomLevel: number;
        private project: Project;
        private projectDrawer: ProjectDrawer;

        constructor(projectService: ProjectService,
                    $location: ng.ILocationService,
                    private $mdDialog: ng.material.MDDialogService) {

            this.project = projectService.get();
            this.project.schedule();
            this.projectDrawer = new ProjectDrawer(this.project);
            this.projectDrawer.draw();

            this.zoomLevel = Utils.dayWidth;

            //$("#taskWrapper").resize(function() {
            //    var margin: number = 66 + $(this).width();
            //    $("#arrows").css("margin-left", margin+"px");
            //    $("#zoom").css("margin-left", margin+"px");
            //});
        }

        public handleZoom(): void {
            console.log(this.zoomLevel);
            this.projectDrawer.changeZoom(this.zoomLevel);
        }

        public newSchedulable() {
        this.$mdDialog.show({
                controller: TaskDetailController,
                controllerAs: "taskDetailController",
                templateUrl: 'gantt/components/taskDetail/taskDetail.html',
                locals : {
                    project : this.project
                }
            });
        }
    }
}