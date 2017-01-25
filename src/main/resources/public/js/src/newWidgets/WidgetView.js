/*
 * Copyright 2016 EPAM Systems
 *
 *
 * This file is part of EPAM Report Portal.
 * https://github.com/reportportal/service-ui
 *
 * Report Portal is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Report Portal is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Report Portal.  If not, see <http://www.gnu.org/licenses/>.
 */
define(function(require, exports, module) {
    'use strict';
    var Backbone = require('backbone');
    var Epoxy = require('backbone-epoxy');
    var Widget = require('widgets');
    var SingletonDefectTypeCollection = require('defectType/SingletonDefectTypeCollection');

    var WidgetView = Epoxy.View.extend({
        className: 'widget-view',
        initialize: function(){
            this.defectTypes = new SingletonDefectTypeCollection();
            var view = Widget.widgetService(this.model.get('content_parameters').gadget);
            var navigationInfo = {
                getCurrentDashboard: function() {
                    return null;
                }
            };
            _.extend(navigationInfo, Backbone.Events);
            var parent = {
                canEdit: function() {
                    return true;
                },
            };
            var param = {
                id: this.model.get('id'),
                name: this.model.get('name'),
                content: this.model.get('content'),
                gadget: this.model.get('content_parameters').gadget,
                content_fields: this.model.get('content_parameters').content_fields,
                filter_id: this.model.get('filter_id'),
                height: 100,
                isTimeline: !!(this.model.get('content_parameters').widgetOptions && this.model.get('content_parameters').widgetOptions.timeline)
            }
            var widgetData = {
                container: this.$el,
                context: null,
                navigationInfo: navigationInfo,
                parent: parent,
                isPreview: false,
                param: param,
            };
            var self = this;
            this.defectTypes.ready.done(function() {
                setTimeout(function() {
                    self.widget = (new view(widgetData)).render();
                }, 1);
            });

            // this.widget = (new view(widgetData)).render();
            // console.dir(view);
        },
        resize: function() {
            EQCSS.apply();
            this.widget && this.widget.updateChart && this.widget.updateChart();
        },
        destroy: function() {
            this.widget && this.widget.destroy();
            this.$el.remove();
        }
    });

    return WidgetView;
})