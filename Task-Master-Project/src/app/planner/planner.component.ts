import { Component, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  EventInput,
  EventAddArg,
  EventChangeArg, EventRemoveArg
} from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from '../event-utils';
import {PlannerService} from "../services/planner.service";
@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent {
  calendarVisible = true;
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: [], // events will be fetched from API
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventAdd: this.handleEventAdd.bind(this),
    eventChange: this.handleEventChange.bind(this),
    eventRemove: this.handleEventRemove.bind(this),
  };
  currentEvents: EventApi[] = [];
  TODAY_STR = new Date().toISOString().replace(/T.*$/, '');

  constructor(private plannerService: PlannerService, private http: HttpClient, private changeDetector: ChangeDetectorRef) {
    plannerService.getEvents().subscribe(events => {
      this.calendarOptions.events = events.map((event: { id: any; title: any; start_time: any; end_time: any; }) => ({
        id: event.id,
        title: event.title,
        start: event.start_time,
        end: event.end_time
      }));
      });
  }

  // fetchEvents() {
  //   this.plannerService.getEvents().subscribe((events: EventInput[]) => {
  //     this.calendarOptions.events = events;
  //   });
  // }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const {calendarOptions} = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      const eventData = {
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      };
      this.plannerService.addEvent(eventData).subscribe((event: EventInput) => {
        calendarApi.addEvent(event);
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      this.plannerService.deleteEvent(clickInfo.event.id).subscribe(() => {
        clickInfo.event.remove();
      });
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  handleEventAdd(event: EventAddArg) {
    this.plannerService.addEvent(event.event.toPlainObject()).subscribe((newEvent: EventInput) => {
      event.event.setProp('id', newEvent.id);
      // event.event.setProp('title', newEvent.title);
    });
  }

  handleEventChange(event: EventChangeArg) {
    this.plannerService.updateEvent(event.event.toPlainObject()).subscribe();
  }

  handleEventRemove(event: EventRemoveArg) {
    this.plannerService.deleteEvent(event.event.id).subscribe();
  }
}

