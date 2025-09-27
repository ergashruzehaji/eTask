// Use relative URLs for API calls so it works both locally and in production
const API_BASE = window.location.origin;

// Initialize these inside DOMContentLoaded to ensure elements exist
let form, input, prioritySelect, yearSelect, timeFormatToggle, alarmAudio;
// Search and Quick Add elements
let searchInput, clearSearchBtn, quickAddBtn, exportBtn, importBtn, importInput;
let quickAddModal, quickAddForm, quickTaskInput, quickDate, quickPriority;
// Bulk operations elements
let bulkActions, selectAllBtn, deleteSelectedBtn, completeSelectedBtn;
// Sidebar toggle
let sidebarToggleBtn, taskSidebar;
// Initialize these inside DOMContentLoaded to ensure elements exist
let quickForm, cancelFormBtn, selectedDateTitle;
let notificationSidebar, closeNotificationsBtn, activeNotifications, mainContent;
let list; // Optional task list element (may not exist after sidebar removal)
let prevMonthBtn, nextMonthBtn, currentMonthDisplay, calendarDays;

// Global variables for language and accessibility
let currentLanguage = 'en';

// Translations object
const translations = {
  en: {
    view_day: "Day", view_week: "Week", view_month: "Month", add_task: "Add Task", cancel: "Cancel",
    task_title: "Task Title", start_time: "Start Time", end_time: "End Time", priority: "Priority",
    high: "High", medium: "Medium", low: "Low", recurring: "Recurring", daily: "Daily",
    weekly: "Weekly", monthly: "Monthly", save_task: "Save Task", close: "Close",
    monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday",
    friday: "Friday", saturday: "Saturday", sunday: "Sunday",
    task_form_title: "Add New Task", select_days: "Select Days", every: "Every",
    weekdays_only: "Weekdays Only", weekends_only: "Weekends Only", custom: "Custom",
    // Short day names
    mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun",
    // Months
    january: "January", february: "February", march: "March", april: "April",
    may: "May", june: "June", july: "July", august: "August",
    september: "September", october: "October", november: "November", december: "December",
    // Month index translations for calendar
    month_0: "January", month_1: "February", month_2: "March", month_3: "April", month_4: "May", month_5: "June",
    month_6: "July", month_7: "August", month_8: "September", month_9: "October", month_10: "November", month_11: "December",
    // New UI elements
    tools: "Tools", tools_panel: "Tools & Tasks", search_tasks: "Search Tasks", 
    search_placeholder: "Search tasks...", quick_actions: "Quick Actions",
    export: "Export", import: "Import", bulk_actions: "Bulk Actions",
    select_all: "Select All", delete_selected: "Delete Selected", 
    complete_selected: "Complete Selected", add_task_for: "Add Task for",
    // Priority Legend
    priority_legend: "Priority Legend", high_priority: "High Priority", 
    medium_priority: "Medium Priority", low_priority: "Low Priority",
    // Floating Tabs and Suggestions System
    suggestions: "Suggestions", suggestions_form_title: "Send us Your Suggestions",
    name_label: "Name", email_label: "Email", suggestions_label: "Your Suggestions",
    name_placeholder: "Enter your name", email_placeholder: "Enter your email address",
    suggestions_placeholder: "Share your suggestions, feedback, or ideas with us (up to 500 words)...",
    submit_suggestions: "Submit Suggestions", character_count: "characters remaining",
    success_title: "Thank you!", success_message: "Your message has been successfully sent.",
    name_required: "Name is required", email_required: "Email is required",
    email_invalid: "Please enter a valid email address", suggestions_required: "Please share your suggestions with us",
    suggestions_too_long: "Suggestions must be 500 words or less",
    // Additional Interface Elements
    task_input_placeholder: "Enter a task...", daily_month: "Daily for Month", 
    weekly_year: "Weekly for Year", time_format: "Time Format",
    // Calendar-specific translations
    tasks_for: "Tasks for", tasks: "Tasks", tomorrow: "Tomorrow",
    // Additional form translations
    your_name: "Your Name", email_address: "Email Address", 
    your_suggestions: "Your Suggestions", characters: "characters", 
    submit_suggestion: "Submit Suggestion",
    // Modal and overlay elements
    quick_add_task: "Quick Add Task", what_needs_done: "What needs to be done?",
    perfect: "Perfect!", thank_you: "Thank you!", feedback_suggestions: "Feedback & Suggestions",
    share_feedback: "Share your feedback to help improve Task Tracker",
    describe_suggestions: "Describe your suggestions, feature requests, or improvements...",
    suggestions_title: "Feedback & Suggestions", suggestions_subtitle: "Share your feedback to help improve Task Tracker",
    weekends: "Weekends", daily_slash_month: "Daily/Month", weekly_slash_year: "Weekly/Year",
    work_week: "Work Week", select_time: "Select time", switch_format: "Switch between AM/PM and 24-hour format",
    // Additional missing translations
    quick_presets: "Quick Presets", active_tasks: "Active Tasks",
    suggestions_button: "Suggestions", submit_suggestion_text: "Submit Suggestion",
    // Alarm functionality
    alarm_reminder: "Alarm Reminder", alarm_on: "Alarm On", alarm_off: "Alarm Off",
    alarm_description: "Rings 5 minutes before and at scheduled time",
    // Context menu functionality
    edit_task: "Edit Task", reschedule_task: "Reschedule", duplicate_task: "Duplicate",
    mark_complete: "Mark Complete", mark_incomplete: "Mark Incomplete", delete_task: "Delete Task",
    confirm_delete: "Confirm Delete", delete_task_message: "Are you sure you want to delete this task? This action cannot be undone.",
    delete: "Delete", date: "Date", frequency: "Frequency", none: "None"
  },
  es: {
    view_day: "Día", view_week: "Semana", view_month: "Mes", add_task: "Agregar Tarea", cancel: "Cancelar",
    task_title: "Título de Tarea", start_time: "Hora de Inicio", end_time: "Hora de Fin", priority: "Prioridad",
    high: "Alta", medium: "Media", low: "Baja", recurring: "Recurrente", daily: "Diario",
    weekly: "Semanal", monthly: "Mensual", save_task: "Guardar Tarea", close: "Cerrar",
    monday: "Lunes", tuesday: "Martes", wednesday: "Miércoles", thursday: "Jueves",
    friday: "Viernes", saturday: "Sábado", sunday: "Domingo",
    task_form_title: "Agregar Nueva Tarea", select_days: "Seleccionar Días", every: "Cada",
    weekdays_only: "Solo Días Laborables", weekends_only: "Solo Fines de Semana", custom: "Personalizado",
    // Short day names  
    mon: "Lun", tue: "Mar", wed: "Mié", thu: "Jue", fri: "Vie", sat: "Sáb", sun: "Dom",
    // Months
    january: "Enero", february: "Febrero", march: "Marzo", april: "Abril",
    may: "Mayo", june: "Junio", july: "Julio", august: "Agosto", 
    september: "Septiembre", october: "Octubre", november: "Noviembre", december: "Diciembre",
    // Month index translations for calendar
    month_0: "Enero", month_1: "Febrero", month_2: "Marzo", month_3: "Abril", month_4: "Mayo", month_5: "Junio",
    month_6: "Julio", month_7: "Agosto", month_8: "Septiembre", month_9: "Octubre", month_10: "Noviembre", month_11: "Diciembre",
    // New UI elements
    tools: "Herramientas", tools_panel: "Herramientas y Tareas", search_tasks: "Buscar Tareas", 
    search_placeholder: "Buscar tareas...", quick_actions: "Acciones Rápidas",
    export: "Exportar", import: "Importar", bulk_actions: "Acciones en Lote",
    select_all: "Seleccionar Todo", delete_selected: "Eliminar Seleccionadas", 
    complete_selected: "Completar Seleccionadas", add_task_for: "Agregar Tarea para",
    // Priority Legend
    priority_legend: "Leyenda de Prioridades", high_priority: "Alta Prioridad",
    medium_priority: "Prioridad Media", low_priority: "Baja Prioridad",
    // Floating Tabs and Suggestions System
    suggestions: "Sugerencias", suggestions_form_title: "Envíanos tus Sugerencias",
    name_label: "Nombre", email_label: "Correo Electrónico", suggestions_label: "Tus Sugerencias",
    name_placeholder: "Ingresa tu nombre", email_placeholder: "Ingresa tu correo electrónico",
    suggestions_placeholder: "Comparte tus sugerencias, comentarios o ideas con nosotros (hasta 500 palabras)...",
    submit_suggestions: "Enviar Sugerencias", character_count: "caracteres restantes",
    success_title: "¡Gracias!", success_message: "Tu mensaje ha sido enviado exitosamente.",
    name_required: "El nombre es obligatorio", email_required: "El correo electrónico es obligatorio",
    email_invalid: "Por favor ingresa un correo electrónico válido", suggestions_required: "Por favor comparte tus sugerencias con nosotros",
    suggestions_too_long: "Las sugerencias deben tener 500 palabras o menos",
    // Additional Interface Elements
    task_input_placeholder: "Ingresa una tarea...", daily_month: "Diario por Mes",
    weekly_year: "Semanal por Año", time_format: "Formato de Hora",
    // Calendar Translation Keys
    tasks_for: "Tareas para", tasks: "Tareas", tomorrow: "Mañana",
    // Additional form translations
    your_name: "Su Nombre", email_address: "Dirección de Correo", 
    your_suggestions: "Sus Sugerencias", characters: "caracteres", 
    submit_suggestion: "Enviar Sugerencia",
    // Modal and overlay elements
    quick_add_task: "Agregar Tarea Rápida", what_needs_done: "¿Qué necesita hacerse?",
    perfect: "¡Perfecto!", thank_you: "¡Gracias!", feedback_suggestions: "Comentarios y Sugerencias",
    share_feedback: "Comparte tus comentarios para ayudar a mejorar Task Tracker",
    describe_suggestions: "Describe tus sugerencias, solicitudes de funciones o mejoras...",
    suggestions_title: "Comentarios y Sugerencias", suggestions_subtitle: "Comparte tus comentarios para ayudar a mejorar Task Tracker",
    weekends: "Fines de Semana", daily_slash_month: "Diario/Mes", weekly_slash_year: "Semanal/Año",
    work_week: "Semana Laboral", select_time: "Seleccionar hora", switch_format: "Cambiar entre formato AM/PM y 24 horas",
    // Additional missing translations
    quick_presets: "Preajustes Rápidos", active_tasks: "Tareas Activas",
    suggestions_button: "Sugerencias", submit_suggestion_text: "Enviar Sugerencia",
    // Alarm functionality
    alarm_reminder: "Recordatorio de Alarma", alarm_on: "Alarma Activada", alarm_off: "Alarma Desactivada",
    alarm_description: "Suena 5 minutos antes y a la hora programada",
    // Context menu functionality
    edit_task: "Editar Tarea", reschedule_task: "Reprogramar", duplicate_task: "Duplicar",
    mark_complete: "Marcar Completada", mark_incomplete: "Marcar Incompleta", delete_task: "Eliminar Tarea",
    confirm_delete: "Confirmar Eliminación", delete_task_message: "¿Estás seguro de que quieres eliminar esta tarea? Esta acción no se puede deshacer.",
    delete: "Eliminar", date: "Fecha", frequency: "Frecuencia", none: "Ninguno"
  },
  fr: {
    view_day: "Jour", view_week: "Semaine", view_month: "Mois", add_task: "Ajouter Tâche", cancel: "Annuler",
    task_title: "Titre de Tâche", start_time: "Heure de Début", end_time: "Heure de Fin", priority: "Priorité",
    high: "Élevée", medium: "Moyenne", low: "Faible", recurring: "Récurrent", daily: "Quotidien",
    weekly: "Hebdomadaire", monthly: "Mensuel", save_task: "Enregistrer Tâche", close: "Fermer",
    monday: "Lundi", tuesday: "Mardi", wednesday: "Mercredi", thursday: "Jeudi",
    friday: "Vendredi", saturday: "Samedi", sunday: "Dimanche",
    task_form_title: "Ajouter Nouvelle Tâche", select_days: "Sélectionner Jours", every: "Chaque",
    weekdays_only: "Jours de Semaine Seulement", weekends_only: "Week-ends Seulement", custom: "Personnalisé",
    // Short day names
    mon: "Lun", tue: "Mar", wed: "Mer", thu: "Jeu", fri: "Ven", sat: "Sam", sun: "Dim",
    // Months
    january: "Janvier", february: "Février", march: "Mars", april: "Avril",
    may: "Mai", june: "Juin", july: "Juillet", august: "Août",
    september: "Septembre", october: "Octobre", november: "Novembre", december: "Décembre",
    month_0: "Janvier", month_1: "Février", month_2: "Mars", month_3: "Avril", month_4: "Mai", month_5: "Juin",
    month_6: "Juillet", month_7: "Août", month_8: "Septembre", month_9: "Octobre", month_10: "Novembre", month_11: "Décembre",
    // New UI elements
    tools: "Outils", tools_panel: "Outils et Tâches", search_tasks: "Rechercher Tâches", 
    search_placeholder: "Rechercher tâches...", quick_actions: "Actions Rapides",
    export: "Exporter", import: "Importer", bulk_actions: "Actions en Lot",
    select_all: "Tout Sélectionner", delete_selected: "Supprimer Sélectionnées", 
    complete_selected: "Terminer Sélectionnées", add_task_for: "Ajouter Tâche pour",
    // Priority Legend
    priority_legend: "Légende des priorités", high_priority: "Priorité élevée",
    medium_priority: "Priorité moyenne", low_priority: "Priorité faible",
    // Floating Tabs and Suggestions System
    suggestions: "Suggestions", suggestions_form_title: "Envoyez-nous vos Suggestions",
    name_label: "Nom", email_label: "E-mail", suggestions_label: "Vos Suggestions",
    name_placeholder: "Entrez votre nom", email_placeholder: "Entrez votre adresse e-mail",
    suggestions_placeholder: "Partagez vos suggestions, commentaires ou idées avec nous (jusqu'à 500 mots)...",
    submit_suggestions: "Envoyer Suggestions", character_count: "caractères restants",
    success_title: "Merci!", success_message: "Votre message a été envoyé avec succès.",
    name_required: "Le nom est requis", email_required: "L'e-mail est requis",
    email_invalid: "Veuillez entrer une adresse e-mail valide", suggestions_required: "Veuillez partager vos suggestions avec nous",
    suggestions_too_long: "Les suggestions doivent contenir 500 mots ou moins",
    // Additional Interface Elements
    task_input_placeholder: "Entrez une tâche...", daily_month: "Quotidien pour le Mois",
    weekly_year: "Hebdomadaire pour l'Année", time_format: "Format de l'Heure",
    // Calendar Translation Keys
    tasks_for: "Tâches pour", tasks: "Tâches", tomorrow: "Demain",
    // Additional form translations
    your_name: "Votre Nom", email_address: "Adresse E-mail", 
    your_suggestions: "Vos Suggestions", characters: "caractères", 
    submit_suggestion: "Soumettre Suggestion",
    // Modal and overlay elements
    quick_add_task: "Ajouter Tâche Rapide", what_needs_done: "Qu'est-ce qui doit être fait?",
    perfect: "Parfait!", thank_you: "Merci!", feedback_suggestions: "Commentaires et Suggestions",
    share_feedback: "Partagez vos commentaires pour aider à améliorer Task Tracker",
    describe_suggestions: "Décrivez vos suggestions, demandes de fonctionnalités ou améliorations...",
    suggestions_title: "Commentaires et Suggestions", suggestions_subtitle: "Partagez vos commentaires pour aider à améliorer Task Tracker",
    weekends: "Week-ends", daily_slash_month: "Quotidien/Mois", weekly_slash_year: "Hebdomadaire/Année",
    work_week: "Semaine de Travail", select_time: "Sélectionner l'heure", switch_format: "Basculer entre le format AM/PM et 24 heures",
    // Additional missing translations
    quick_presets: "Préréglages Rapides", active_tasks: "Tâches Actives",
    suggestions_button: "Suggestions", submit_suggestion_text: "Soumettre Suggestion",
    // Alarm functionality
    alarm_reminder: "Rappel d'Alarme", alarm_on: "Alarme Activée", alarm_off: "Alarme Désactivée",
    alarm_description: "Sonne 5 minutes avant et à l'heure programmée",
    // Context menu functionality
    edit_task: "Modifier Tâche", reschedule_task: "Reprogrammer", duplicate_task: "Dupliquer",
    mark_complete: "Marquer Terminée", mark_incomplete: "Marquer Incomplète", delete_task: "Supprimer Tâche",
    confirm_delete: "Confirmer Suppression", delete_task_message: "Êtes-vous sûr de vouloir supprimer cette tâche? Cette action ne peut pas être annulée.",
    delete: "Supprimer", date: "Date", frequency: "Fréquence", none: "Aucun"
  },
  de: {
    view_day: "Tag", view_week: "Woche", view_month: "Monat", add_task: "Aufgabe hinzufügen", cancel: "Abbrechen",
    task_title: "Aufgabentitel", start_time: "Startzeit", end_time: "Endzeit", priority: "Priorität",
    high: "Hoch", medium: "Mittel", low: "Niedrig", recurring: "Wiederkehrend", daily: "Täglich",
    weekly: "Wöchentlich", monthly: "Monatlich", save_task: "Aufgabe speichern", close: "Schließen",
    monday: "Montag", tuesday: "Dienstag", wednesday: "Mittwoch", thursday: "Donnerstag",
    friday: "Freitag", saturday: "Samstag", sunday: "Sonntag",
    task_form_title: "Neue Aufgabe hinzufügen", select_days: "Tage auswählen", every: "Jeden",
    weekdays_only: "Nur Wochentage", weekends_only: "Nur Wochenenden", custom: "Benutzerdefiniert",
    // Short day names
    mon: "Mo", tue: "Di", wed: "Mi", thu: "Do", fri: "Fr", sat: "Sa", sun: "So",
    // Months
    january: "Januar", february: "Februar", march: "März", april: "April",
    may: "Mai", june: "Juni", july: "Juli", august: "August",
    september: "September", october: "Oktober", november: "November", december: "Dezember",
    // Month index translations for calendar
    month_0: "Januar", month_1: "Februar", month_2: "März", month_3: "April", month_4: "Mai", month_5: "Juni",
    month_6: "Juli", month_7: "August", month_8: "September", month_9: "Oktober", month_10: "November", month_11: "Dezember",
    // New UI elements
    tools: "Werkzeuge", tools_panel: "Werkzeuge & Aufgaben", search_tasks: "Aufgaben suchen", 
    search_placeholder: "Aufgaben suchen...", quick_actions: "Schnelle Aktionen",
    export: "Exportieren", import: "Importieren", bulk_actions: "Massenaktionen",
    select_all: "Alle auswählen", delete_selected: "Ausgewählte löschen", 
    complete_selected: "Ausgewählte abschließen", add_task_for: "Aufgabe hinzufügen für",
    // Priority Legend
    priority_legend: "Prioritäts-Legende", high_priority: "Hohe Priorität",
    medium_priority: "Mittlere Priorität", low_priority: "Niedrige Priorität",
    // Floating Tabs and Suggestions System
    suggestions: "Vorschläge", suggestions_form_title: "Senden Sie uns Ihre Vorschläge",
    name_label: "Name", email_label: "E-Mail", suggestions_label: "Ihre Vorschläge",
    name_placeholder: "Geben Sie Ihren Namen ein", email_placeholder: "Geben Sie Ihre E-Mail-Adresse ein",
    suggestions_placeholder: "Teilen Sie Ihre Vorschläge, Feedback oder Ideen mit uns (bis zu 500 Wörter)...",
    submit_suggestions: "Vorschläge Senden", character_count: "Zeichen übrig",
    success_title: "Vielen Dank!", success_message: "Ihre Nachricht wurde erfolgreich gesendet.",
    name_required: "Name ist erforderlich", email_required: "E-Mail ist erforderlich",
    email_invalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein", suggestions_required: "Bitte teilen Sie Ihre Vorschläge mit uns",
    suggestions_too_long: "Vorschläge müssen 500 Wörter oder weniger enthalten",
    // Additional Interface Elements
    task_input_placeholder: "Geben Sie eine Aufgabe ein...", daily_month: "Täglich für den Monat",
    weekly_year: "Wöchentlich für das Jahr", time_format: "Zeitformat",
    // Calendar Translation Keys
    tasks_for: "Aufgaben für", tasks: "Aufgaben", tomorrow: "Morgen",
    // Additional form translations
    your_name: "Ihr Name", email_address: "E-Mail-Adresse", 
    your_suggestions: "Ihre Vorschläge", characters: "zeichen", 
    submit_suggestion: "Vorschlag Senden",
    // Modal and overlay elements
    quick_add_task: "Schnelle Aufgabe hinzufügen", what_needs_done: "Was muss getan werden?",
    perfect: "Perfekt!", thank_you: "Vielen Dank!", feedback_suggestions: "Feedback und Vorschläge",
    share_feedback: "Teilen Sie Ihr Feedback mit, um Task Tracker zu verbessern",
    describe_suggestions: "Beschreiben Sie Ihre Vorschläge, Feature-Anfragen oder Verbesserungen...",
    suggestions_title: "Feedback und Vorschläge", suggestions_subtitle: "Teilen Sie Ihr Feedback mit, um Task Tracker zu verbessern",
    weekends: "Wochenenden", daily_slash_month: "Täglich/Monat", weekly_slash_year: "Wöchentlich/Jahr",
    work_week: "Arbeitswoche", select_time: "Zeit auswählen", switch_format: "Zwischen AM/PM und 24-Stunden-Format wechseln",
    // Additional missing translations
    quick_presets: "Schnelleinstellungen", active_tasks: "Aktive Aufgaben",
    suggestions_button: "Vorschläge", submit_suggestion_text: "Vorschlag Senden",
    // Alarm functionality
    alarm_reminder: "Alarm Erinnerung", alarm_on: "Alarm Ein", alarm_off: "Alarm Aus",
    alarm_description: "Klingelt 5 Minuten vorher und zur geplanten Zeit",
    // Context menu functionality
    edit_task: "Aufgabe Bearbeiten", reschedule_task: "Neu Planen", duplicate_task: "Duplizieren",
    mark_complete: "Als Erledigt Markieren", mark_incomplete: "Als Unvollständig Markieren", delete_task: "Aufgabe Löschen",
    confirm_delete: "Löschen Bestätigen", delete_task_message: "Sind Sie sicher, dass Sie diese Aufgabe löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.",
    delete: "Löschen", date: "Datum", frequency: "Häufigkeit", none: "Keine"
  },
  zh: {
    view_day: "日", view_week: "周", view_month: "月", add_task: "添加任务", cancel: "取消",
    task_title: "任务标题", start_time: "开始时间", end_time: "结束时间", priority: "优先级",
    high: "高", medium: "中", low: "低", recurring: "重复", daily: "每日",
    weekly: "每周", monthly: "每月", save_task: "保存任务", close: "关闭",
    monday: "星期一", tuesday: "星期二", wednesday: "星期三", thursday: "星期四",
    friday: "星期五", saturday: "星期六", sunday: "星期日",
    task_form_title: "添加新任务", select_days: "选择日期", every: "每",
    weekdays_only: "仅工作日", weekends_only: "仅周末", custom: "自定义",
    // Short day names
    mon: "周一", tue: "周二", wed: "周三", thu: "周四", fri: "周五", sat: "周六", sun: "周日",
    // Months
    january: "一月", february: "二月", march: "三月", april: "四月",
    may: "五月", june: "六月", july: "七月", august: "八月",
    september: "九月", october: "十月", november: "十一月", december: "十二月",
    month_0: "一月", month_1: "二月", month_2: "三月", month_3: "四月", month_4: "五月", month_5: "六月",
    month_6: "七月", month_7: "八月", month_8: "九月", month_9: "十月", month_10: "十一月", month_11: "十二月",
    // New UI elements
    tools: "工具", tools_panel: "工具和任务", search_tasks: "搜索任务", 
    search_placeholder: "搜索任务...", quick_actions: "快速操作",
    export: "导出", import: "导入", bulk_actions: "批量操作",
    select_all: "全选", delete_selected: "删除选中", 
    complete_selected: "完成选中", add_task_for: "为...添加任务",
    // Priority Legend
    priority_legend: "优先级图例", high_priority: "高优先级",
    medium_priority: "中优先级", low_priority: "低优先级",
    // Floating Tabs and Suggestions System
    suggestions: "建议", suggestions_form_title: "向我们发送您的建议",
    name_label: "姓名", email_label: "电子邮件", suggestions_label: "您的建议",
    name_placeholder: "请输入您的姓名", email_placeholder: "请输入您的电子邮件地址",
    suggestions_placeholder: "与我们分享您的建议、反馈或想法（最多500字）...",
    submit_suggestions: "提交建议", character_count: "剩余字符",
    success_title: "谢谢！", success_message: "您的消息已成功发送。",
    name_required: "姓名为必填项", email_required: "电子邮件为必填项",
    email_invalid: "请输入有效的电子邮件地址", suggestions_required: "请与我们分享您的建议",
    suggestions_too_long: "建议必须在500字以内",
    // Additional Interface Elements
    task_input_placeholder: "请输入任务...", daily_month: "每日一个月",
    weekly_year: "每周一年", time_format: "时间格式",
    // Calendar Translation Keys
    tasks_for: "任务为", tasks: "任务", tomorrow: "明天",
    // Additional form translations
    your_name: "您的姓名", email_address: "电子邮件地址", 
    your_suggestions: "您的建议", characters: "字符", 
    submit_suggestion: "提交建议",
    // Modal and overlay elements
    quick_add_task: "快速添加任务", what_needs_done: "需要做什么？",
    perfect: "完美！", thank_you: "谢谢！", feedback_suggestions: "反馈和建议",
    share_feedback: "分享您的反馈以帮助改进任务跟踪器",
    describe_suggestions: "描述您的建议、功能请求或改进...",
    suggestions_title: "反馈和建议", suggestions_subtitle: "分享您的反馈以帮助改进任务跟踪器",
    weekends: "周末", daily_slash_month: "每日/月", weekly_slash_year: "每周/年",
    work_week: "工作周", select_time: "选择时间", switch_format: "在AM/PM和24小时格式之间切换",
    // Additional missing translations
    quick_presets: "快速预设", active_tasks: "活动任务",
    suggestions_button: "建议", submit_suggestion_text: "提交建议"
  },
  it: {
    view_day: "Giorno", view_week: "Settimana", view_month: "Mese", add_task: "Aggiungi Attività", cancel: "Annulla",
    task_title: "Titolo Attività", start_time: "Ora Inizio", end_time: "Ora Fine", priority: "Priorità",
    high: "Alta", medium: "Media", low: "Bassa", recurring: "Ricorrente", daily: "Giornaliero",
    weekly: "Settimanale", monthly: "Mensile", save_task: "Salva Attività", close: "Chiudi",
    monday: "Lunedì", tuesday: "Martedì", wednesday: "Mercoledì", thursday: "Giovedì",
    friday: "Venerdì", saturday: "Sabato", sunday: "Domenica",
    task_form_title: "Aggiungi Nuova Attività", select_days: "Seleziona Giorni", every: "Ogni",
    weekdays_only: "Solo Giorni Feriali", weekends_only: "Solo Weekend", custom: "Personalizzato",
    // Short day names
    mon: "Lun", tue: "Mar", wed: "Mer", thu: "Gio", fri: "Ven", sat: "Sab", sun: "Dom",
    // Months
    january: "Gennaio", february: "Febbraio", march: "Marzo", april: "Aprile",
    may: "Maggio", june: "Giugno", july: "Luglio", august: "Agosto",
    september: "Settembre", october: "Ottobre", november: "Novembre", december: "Dicembre",
    month_0: "Gennaio", month_1: "Febbraio", month_2: "Marzo", month_3: "Aprile", month_4: "Maggio", month_5: "Giugno",
    month_6: "Luglio", month_7: "Agosto", month_8: "Settembre", month_9: "Ottobre", month_10: "Novembre", month_11: "Dicembre",
    // New UI elements
    tools: "Strumenti", tools_panel: "Strumenti e Attività", search_tasks: "Cerca Attività", 
    search_placeholder: "Cerca attività...", quick_actions: "Azioni Rapide",
    export: "Esporta", import: "Importa", bulk_actions: "Azioni Multiple",
    select_all: "Seleziona Tutto", delete_selected: "Elimina Selezionate", 
    complete_selected: "Completa Selezionate", add_task_for: "Aggiungi Attività per",
    // Priority Legend
    priority_legend: "Legenda Priorità", high_priority: "Alta Priorità",
    medium_priority: "Media Priorità", low_priority: "Bassa Priorità",
    // Floating Tabs and Suggestions System
    suggestions: "Suggerimenti", suggestions_form_title: "Inviaci i Tuoi Suggerimenti",
    name_label: "Nome", email_label: "E-mail", suggestions_label: "I Tuoi Suggerimenti",
    name_placeholder: "Inserisci il tuo nome", email_placeholder: "Inserisci il tuo indirizzo e-mail",
    suggestions_placeholder: "Condividi i tuoi suggerimenti, feedback o idee con noi (fino a 500 parole)...",
    submit_suggestions: "Invia Suggerimenti", character_count: "caratteri rimanenti",
    success_title: "Grazie!", success_message: "Il tuo messaggio è stato inviato con successo.",
    name_required: "Il nome è obbligatorio", email_required: "L'e-mail è obbligatoria",
    email_invalid: "Inserisci un indirizzo e-mail valido", suggestions_required: "Condividi i tuoi suggerimenti con noi",
    suggestions_too_long: "I suggerimenti devono essere di 500 parole o meno",
    // Additional Interface Elements
    task_input_placeholder: "Inserisci un'attività...", daily_month: "Giornaliero per Mese",
    weekly_year: "Settimanale per Anno", time_format: "Formato Orario",
    // Calendar Translation Keys
    tasks_for: "Attività per", tasks: "Attività", tomorrow: "Domani",
    // Additional form translations
    your_name: "Il Tuo Nome", email_address: "Indirizzo E-mail", 
    your_suggestions: "I Tuoi Suggerimenti", characters: "caratteri", 
    submit_suggestion: "Invia Suggerimento",
    // Modal and overlay elements
    quick_add_task: "Aggiungi Attività Veloce", what_needs_done: "Cosa deve essere fatto?",
    perfect: "Perfetto!", thank_you: "Grazie!", feedback_suggestions: "Feedback e Suggerimenti",
    share_feedback: "Condividi il tuo feedback per aiutare a migliorare Task Tracker",
    describe_suggestions: "Descrivi i tuoi suggerimenti, richieste di funzionalità o miglioramenti...",
    suggestions_title: "Feedback e Suggerimenti", suggestions_subtitle: "Condividi il tuo feedback per aiutare a migliorare Task Tracker",
    weekends: "Weekend", daily_slash_month: "Giornaliero/Mese", weekly_slash_year: "Settimanale/Anno",
    work_week: "Settimana Lavorativa", select_time: "Seleziona orario", switch_format: "Passa tra formato AM/PM e 24 ore",
    // Additional missing translations
    quick_presets: "Preset Rapidi", active_tasks: "Attività Attive",
    suggestions_button: "Suggerimenti", submit_suggestion_text: "Invia Suggerimento"
  },
  ru: {
    view_day: "День", view_week: "Неделя", view_month: "Месяц", add_task: "Добавить Задачу", cancel: "Отмена",
    task_title: "Название Задачи", start_time: "Время Начала", end_time: "Время Окончания", priority: "Приоритет",
    high: "Высокий", medium: "Средний", low: "Низкий", recurring: "Повторяющийся", daily: "Ежедневно",
    weekly: "Еженедельно", monthly: "Ежемесячно", save_task: "Сохранить Задачу", close: "Закрыть",
    monday: "Понедельник", tuesday: "Вторник", wednesday: "Среда", thursday: "Четверг",
    friday: "Пятница", saturday: "Суббота", sunday: "Воскресенье",
    task_form_title: "Добавить Новую Задачу", select_days: "Выбрать Дни", every: "Каждый",
    weekdays_only: "Только Будни", weekends_only: "Только Выходные", custom: "Настроить",
    // Short day names
    mon: "Пн", tue: "Вт", wed: "Ср", thu: "Чт", fri: "Пт", sat: "Сб", sun: "Вс",
    // Months
    january: "Январь", february: "Февраль", march: "Март", april: "Апрель",
    may: "Май", june: "Июнь", july: "Июль", august: "Август",
    september: "Сентябрь", october: "Октябрь", november: "Ноябрь", december: "Декабрь",
    month_0: "Январь", month_1: "Февраль", month_2: "Март", month_3: "Апрель", month_4: "Май", month_5: "Июнь",
    month_6: "Июль", month_7: "Август", month_8: "Сентябрь", month_9: "Октябрь", month_10: "Ноябрь", month_11: "Декабрь",
    // Priority Legend
    priority_legend: "Легенда Приоритетов", high_priority: "Высокий Приоритет",
    medium_priority: "Средний Приоритет", low_priority: "Низкий Приоритет",
    // Floating Tabs and Suggestions System
    suggestions: "Предложения", suggestions_form_title: "Отправьте нам Ваши Предложения",
    name_label: "Имя", email_label: "Электронная почта", suggestions_label: "Ваши Предложения",
    name_placeholder: "Введите ваше имя", email_placeholder: "Введите ваш адрес электронной почты",
    suggestions_placeholder: "Поделитесь с нами вашими предложениями, отзывами или идеями (до 500 слов)...",
    submit_suggestions: "Отправить Предложения", character_count: "символов осталось",
    success_title: "Спасибо!", success_message: "Ваше сообщение было успешно отправлено.",
    name_required: "Имя обязательно", email_required: "Электронная почта обязательна",
    email_invalid: "Пожалуйста, введите действительный адрес электронной почты", suggestions_required: "Пожалуйста, поделитесь с нами вашими предложениями",
    suggestions_too_long: "Предложения должны содержать не более 500 слов",
    // Additional Interface Elements
    task_input_placeholder: "Введите задачу...", daily_month: "Ежедневно в течение месяца",
    weekly_year: "Еженедельно в течение года", time_format: "Формат времени",
    // Calendar Translation Keys
    tasks_for: "Задачи на", tasks: "Задачи", tomorrow: "Завтра",
    // Additional form translations
    your_name: "Ваше Имя", email_address: "Адрес Электронной Почты", 
    your_suggestions: "Ваши Предложения", characters: "символов", 
    submit_suggestion: "Отправить Предложение",
    // Modal and overlay elements
    quick_add_task: "Быстро Добавить Задачу", what_needs_done: "Что нужно сделать?",
    perfect: "Идеально!", thank_you: "Спасибо!", feedback_suggestions: "Отзывы и Предложения",
    share_feedback: "Поделитесь своими отзывами, чтобы помочь улучшить Task Tracker",
    describe_suggestions: "Опишите ваши предложения, запросы функций или улучшения...",
    suggestions_title: "Отзывы и Предложения", suggestions_subtitle: "Поделитесь своими отзывами, чтобы помочь улучшить Task Tracker",
    weekends: "Выходные", daily_slash_month: "Ежедневно/Месяц", weekly_slash_year: "Еженедельно/Год",
    work_week: "Рабочая Неделя", select_time: "Выбрать время", switch_format: "Переключение между AM/PM и 24-часовым форматом",
    // Additional missing translations
    quick_presets: "Быстрые Пресеты", active_tasks: "Активные Задачи",
    suggestions_button: "Предложения", submit_suggestion_text: "Отправить Предложение"
  },
  ja: {
    view_day: "日", view_week: "週", view_month: "月", add_task: "タスクを追加", cancel: "キャンセル",
    task_title: "タスクタイトル", start_time: "開始時間", end_time: "終了時間", priority: "優先度",
    high: "高", medium: "中", low: "低", recurring: "繰り返し", daily: "毎日",
    weekly: "毎週", monthly: "毎月", save_task: "タスクを保存", close: "閉じる",
    monday: "月曜日", tuesday: "火曜日", wednesday: "水曜日", thursday: "木曜日",
    friday: "金曜日", saturday: "土曜日", sunday: "日曜日",
    task_form_title: "新しいタスクを追加", select_days: "日を選択", every: "毎",
    weekdays_only: "平日のみ", weekends_only: "週末のみ", custom: "カスタム",
    // Short day names
    mon: "月", tue: "火", wed: "水", thu: "木", fri: "金", sat: "土", sun: "日",
    // Months
    january: "1月", february: "2月", march: "3月", april: "4月",
    may: "5月", june: "6月", july: "7月", august: "8月",
    september: "9月", october: "10月", november: "11月", december: "12月",
    month_0: "1月", month_1: "2月", month_2: "3月", month_3: "4月", month_4: "5月", month_5: "6月",
    month_6: "7月", month_7: "8月", month_8: "9月", month_9: "10月", month_10: "11月", month_11: "12月",
    // Priority Legend
    priority_legend: "優先度凡例", high_priority: "高優先度",
    medium_priority: "中優先度", low_priority: "低優先度",
    // Floating Tabs and Suggestions System
    suggestions: "提案", suggestions_form_title: "ご提案をお送りください",
    name_label: "お名前", email_label: "メールアドレス", suggestions_label: "ご提案",
    name_placeholder: "お名前を入力してください", email_placeholder: "メールアドレスを入力してください",
    suggestions_placeholder: "ご提案、フィードバック、アイデアをお聞かせください（500文字まで）...",
    submit_suggestions: "提案を送信", character_count: "文字残り",
    success_title: "ありがとうございます！", success_message: "メッセージが正常に送信されました。",
    name_required: "お名前は必須です", email_required: "メールアドレスは必須です",
    email_invalid: "有効なメールアドレスを入力してください", suggestions_required: "ご提案をお聞かせください",
    suggestions_too_long: "提案は500文字以下にしてください",
    // Additional Interface Elements
    task_input_placeholder: "タスクを入力してください...", daily_month: "月間毎日",
    weekly_year: "年間毎週", time_format: "時刻形式",
    // Calendar Translation Keys
    tasks_for: "のタスク", tasks: "タスク", tomorrow: "明日",
    // Additional form translations
    your_name: "お名前", email_address: "メールアドレス", 
    your_suggestions: "ご提案", characters: "文字", 
    submit_suggestion: "提案を送信",
    // Modal and overlay elements
    quick_add_task: "クイックタスク追加", what_needs_done: "何をする必要がありますか？",
    perfect: "完璧！", thank_you: "ありがとうございます！", feedback_suggestions: "フィードバックと提案",
    share_feedback: "Task Trackerの改善にご協力ください",
    describe_suggestions: "ご提案、機能リクエスト、改善点をお聞かせください...",
    suggestions_title: "フィードバックと提案", suggestions_subtitle: "Task Trackerの改善にご協力ください",
    weekends: "週末", daily_slash_month: "毎日/月", weekly_slash_year: "毎週/年",
    work_week: "平日", select_time: "時間を選択", switch_format: "AM/PMと24時間形式を切り替え",
    // Additional missing translations
    quick_presets: "クイックプリセット", active_tasks: "アクティブなタスク",
    suggestions_button: "提案", submit_suggestion_text: "提案を送信"
  },
  tr: {
    view_day: "Gün", view_week: "Hafta", view_month: "Ay", add_task: "Görev Ekle", cancel: "İptal",
    task_title: "Görev Başlığı", start_time: "Başlangıç Saati", end_time: "Bitiş Saati", priority: "Öncelik",
    high: "Yüksek", medium: "Orta", low: "Düşük", recurring: "Tekrarlayan", daily: "Günlük",
    weekly: "Haftalık", monthly: "Aylık", save_task: "Görevi Kaydet", close: "Kapat",
    monday: "Pazartesi", tuesday: "Salı", wednesday: "Çarşamba", thursday: "Perşembe",
    friday: "Cuma", saturday: "Cumartesi", sunday: "Pazar",
    task_form_title: "Yeni Görev Ekle", select_days: "Günleri Seç", every: "Her",
    weekdays_only: "Sadece Hafta İçi", weekends_only: "Sadece Hafta Sonu", custom: "Özel",
    // Short day names
    mon: "Pzt", tue: "Sal", wed: "Çar", thu: "Per", fri: "Cum", sat: "Cmt", sun: "Paz",
    // Months
    january: "Ocak", february: "Şubat", march: "Mart", april: "Nisan",
    may: "Mayıs", june: "Haziran", july: "Temmuz", august: "Ağustos",
    september: "Eylül", october: "Ekim", november: "Kasım", december: "Aralık",
    month_0: "Ocak", month_1: "Şubat", month_2: "Mart", month_3: "Nisan", month_4: "Mayıs", month_5: "Haziran",
    month_6: "Temmuz", month_7: "Ağustos", month_8: "Eylül", month_9: "Ekim", month_10: "Kasım", month_11: "Aralık",
    // Priority Legend
    priority_legend: "Öncelik Açıklaması", high_priority: "Yüksek Öncelik",
    medium_priority: "Orta Öncelik", low_priority: "Düşük Öncelik",
    // Floating Tabs and Suggestions System
    suggestions: "Öneriler", suggestions_form_title: "Önerilerinizi Bize Gönderin",
    name_label: "Ad", email_label: "E-posta", suggestions_label: "Önerileriniz",
    name_placeholder: "Adınızı girin", email_placeholder: "E-posta adresinizi girin",
    suggestions_placeholder: "Önerilerinizi, geri bildirimlerinizi veya fikirlerinizi bizimle paylaşin (500 kelimeye kadar)...",
    submit_suggestions: "Önerileri Gönder", character_count: "karakter kaldı",
    success_title: "Teşekkürler!", success_message: "Mesajınız başarıyla gönderildi.",
    name_required: "Ad gereklidir", email_required: "E-posta gereklidir",
    email_invalid: "Lütfen geçerli bir e-posta adresi girin", suggestions_required: "Lütfen önerilerinizi bizimle paylaşın",
    suggestions_too_long: "Öneriler 500 kelime veya daha az olmalıdır",
    // Additional Interface Elements
    task_input_placeholder: "Bir görev girin...", daily_month: "Ay için Günlük",
    weekly_year: "Yıl için Haftalık", time_format: "Saat Formatı",
    // Calendar Translation Keys
    tasks_for: "Görevler için", tasks: "Görevler", tomorrow: "Yarın",
    // Additional form translations
    your_name: "Adınız", email_address: "E-posta Adresi", 
    your_suggestions: "Önerileriniz", characters: "karakter", 
    submit_suggestion: "Öneri Gönder",
    // Modal and overlay elements
    quick_add_task: "Hızlı Görev Ekle", what_needs_done: "Ne yapılması gerekiyor?",
    perfect: "Mükemmel!", thank_you: "Teşekkürler!", feedback_suggestions: "Geri Bildirim ve Öneriler",
    share_feedback: "Task Tracker'ı geliştirmek için geri bildiriminizi paylaşın",
    describe_suggestions: "Önerilerinizi, özellik isteklerinizi veya iyileştirmelerinizi açıklayın...",
    suggestions_title: "Geri Bildirim ve Öneriler", suggestions_subtitle: "Task Tracker'ı geliştirmek için geri bildiriminizi paylaşın",
    weekends: "Hafta Sonları", daily_slash_month: "Günlük/Ay", weekly_slash_year: "Haftalık/Yıl",
    work_week: "Çalışma Haftası", select_time: "Zaman seç", switch_format: "AM/PM ve 24 saat formatı arasında geçiş yap",
    // Additional missing translations
    quick_presets: "Hızlı Ön Ayarlar", active_tasks: "Aktif Görevler",
    suggestions_button: "Öneriler", submit_suggestion_text: "Öneri Gönder"
  },
  ar: {
    view_day: "يوم", view_week: "أسبوع", view_month: "شهر", add_task: "إضافة مهمة", cancel: "إلغاء",
    task_title: "عنوان المهمة", start_time: "وقت البداية", end_time: "وقت النهاية", priority: "الأولوية",
    high: "عالية", medium: "متوسطة", low: "منخفضة", recurring: "متكررة", daily: "يومياً",
    weekly: "أسبوعياً", monthly: "شهرياً", save_task: "حفظ المهمة", close: "إغلاق",
    monday: "الإثنين", tuesday: "الثلاثاء", wednesday: "الأربعاء", thursday: "الخميس",
    friday: "الجمعة", saturday: "السبت", sunday: "الأحد",
    task_form_title: "إضافة مهمة جديدة", select_days: "اختر الأيام", every: "كل",
    weekdays_only: "أيام العمل فقط", weekends_only: "عطلة نهاية الأسبوع فقط", custom: "مخصص",
    // Short day names
    mon: "إثن", tue: "ثلا", wed: "أرب", thu: "خمي", fri: "جمع", sat: "سبت", sun: "أحد",
    // Months
    january: "يناير", february: "فبراير", march: "مارس", april: "أبريل",
    may: "مايو", june: "يونيو", july: "يوليو", august: "أغسطس",
    september: "سبتمبر", october: "أكتوبر", november: "نوفمبر", december: "ديسمبر",
    month_0: "يناير", month_1: "فبراير", month_2: "مارس", month_3: "أبريل", month_4: "مايو", month_5: "يونيو",
    month_6: "يوليو", month_7: "أغسطس", month_8: "سبتمبر", month_9: "أكتوبر", month_10: "نوفمبر", month_11: "ديسمبر",
    // Priority Legend
    priority_legend: "مفتاح الأولويات", high_priority: "أولوية عالية",
    medium_priority: "أولوية متوسطة", low_priority: "أولوية منخفضة",
    // Floating Tabs and Suggestions System
    suggestions: "اقتراحات", suggestions_form_title: "أرسل لنا اقتراحاتك",
    name_label: "الاسم", email_label: "البريد الإلكتروني", suggestions_label: "اقتراحاتك",
    name_placeholder: "أدخل اسمك", email_placeholder: "أدخل عنوان بريدك الإلكتروني",
    suggestions_placeholder: "شاركنا اقتراحاتك أو تعليقاتك أو أفكارك (حتى 500 كلمة)...",
    submit_suggestions: "إرسال الاقتراحات", character_count: "حرف متبقي",
    success_title: "شكراً لك!", success_message: "تم إرسال رسالتك بنجاح.",
    name_required: "الاسم مطلوب", email_required: "البريد الإلكتروني مطلوب",
    email_invalid: "يرجى إدخال عنوان بريد إلكتروني صحيح", suggestions_required: "يرجى مشاركة اقتراحاتك معنا",
    suggestions_too_long: "يجب أن تكون الاقتراحات 500 كلمة أو أقل",
    // Additional Interface Elements
    task_input_placeholder: "أدخل مهمة...", daily_month: "يومياً للشهر",
    weekly_year: "أسبوعياً للسنة", time_format: "صيغة الوقت",
    // Calendar Translation Keys
    tasks_for: "مهام لـ", tasks: "مهام", tomorrow: "غداً",
    // Additional form translations
    your_name: "اسمك", email_address: "عنوان البريد الإلكتروني", 
    your_suggestions: "اقتراحاتك", characters: "أحرف", 
    submit_suggestion: "إرسال اقتراح",
    // Modal and overlay elements
    quick_add_task: "إضافة مهمة سريعة", what_needs_done: "ما الذي يحتاج إلى القيام به؟",
    perfect: "مثالي!", thank_you: "شكراً لك!", feedback_suggestions: "التعليقات والاقتراحات",
    share_feedback: "شارك تعليقاتك لمساعدتنا في تحسين متتبع المهام",
    describe_suggestions: "صف اقتراحاتك أو طلبات الميزات أو التحسينات...",
    suggestions_title: "التعليقات والاقتراحات", suggestions_subtitle: "شارك تعليقاتك لمساعدتنا في تحسين متتبع المهام",
    weekends: "عطلات نهاية الأسبوع", daily_slash_month: "يومي/شهر", weekly_slash_year: "أسبوعي/سنة",
    work_week: "أسبوع العمل", select_time: "اختر الوقت", switch_format: "التبديل بين صيغة AM/PM وصيغة 24 ساعة",
    // Additional missing translations
    quick_presets: "الإعدادات السريعة", active_tasks: "المهام النشطة",
    suggestions_button: "اقتراحات", submit_suggestion_text: "إرسال اقتراح"
  }
};

let tasks = [];
let currentCalendarDate = new Date(); // Current calendar view
let selectedDate = null; // Selected calendar date
let alarmTimeouts = []; // Store alarm timeouts
let alarmTimeout = null; // Store current alarm timeout
let currentFilter = 'all'; // Current sidebar filter
let currentView = 'week'; // Current calendar view (day, week, month, year)
let timeSlots = []; // Time slots for the calendar

let activeTaskNotifications = []; // Store active notifications
let notificationCheckInterval; // Store interval for checking notifications
let is24HourFormat = false; // Track current time format (false = AM/PM, true = 24h)

// Helper function to format time inputs based on current format
function formatTimeDisplay(timeString) {
    if (!timeString) return timeString;
    
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    
    if (is24HourFormat) {
        return `${hours}:${minutes}`;
    } else {
        const suffix = hour < 12 ? 'AM' : 'PM';
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        return `${displayHour}:${minutes} ${suffix}`;
    }
}

// Initialize year selector with current year and future years
function initializeYearSelector() {
    if (!yearSelect) {
        return;
    }
    
    const currentYear = 2025; // Fixed to start from 2025
    const futureYears = 26; // Show 26 years (2025-2050 inclusive)
    
    yearSelect.innerHTML = ''; // Clear existing options
    
    for (let i = 0; i < futureYears; i++) {
        const year = currentYear + i;
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        
        // Set 2025 as selected by default
        if (year === currentYear) {
            option.selected = true;
        }
        
        yearSelect.appendChild(option);
    }
}

// Handle year change
function handleYearChange() {
    const selectedYear = parseInt(yearSelect.value);
    currentCalendarDate.setFullYear(selectedYear);
  renderCurrentView();
}

// Initialize time format toggle
function initializeTimeFormatToggle() {
    console.log('Initializing time format toggle...');
    updateTimeFormatToggle();
    updateTimeInputs();
    console.log('Time format toggle initialization complete');
}

// Update time format toggle button text
function updateTimeFormatToggle() {
    if (timeFormatToggle) {
        timeFormatToggle.textContent = is24HourFormat ? '24H' : 'AM/PM';
        timeFormatToggle.classList.toggle('active-24h', is24HourFormat);
    }
}

// Update time inputs based on current format
function updateTimeInputs() {
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    
    if (startTimeInput && endTimeInput) {
        // Store current values
        const startValue = startTimeInput.value;
        const endValue = endTimeInput.value;
        
        // Update input step and format
        if (is24HourFormat) {
            startTimeInput.step = "60"; // 1 minute steps
            endTimeInput.step = "60";
            startTimeInput.placeholder = "13:30";
            endTimeInput.placeholder = "14:30";
        } else {
            startTimeInput.step = "60";
            endTimeInput.step = "60";
            startTimeInput.placeholder = "1:30 PM";
            endTimeInput.placeholder = "2:30 PM";
        }
        
        // Convert existing values if any
        if (startValue) {
            startTimeInput.value = convertTimeFormat(startValue);
        }
        if (endValue) {
            endTimeInput.value = convertTimeFormat(endValue);
        }
    }
}

// Convert time between formats
function convertTimeFormat(timeValue) {
    if (!timeValue) return timeValue;
    
    // HTML time inputs always use 24h format internally (HH:MM)
    // So we don't need to convert the actual value, just update display
    return timeValue;
}

// Sidebar removed

// Recurring Task Functionality
let recurringExpanded = false;

function initializeRecurringSection() {
    const toggleBtn = document.getElementById('toggle-recurring');
    const recurringOptions = document.getElementById('recurring-options');
    const recurringType = document.getElementById('recurring-type');
    const weeklyOptions = document.getElementById('weekly-options');
    const presetBtns = document.querySelectorAll('.preset-btn');
    const submitBtn = document.querySelector('.btn-primary');
    const submitText = document.getElementById('submit-text');
    
    if (!toggleBtn || !recurringOptions) return;
    
    // Toggle recurring section
    toggleBtn.addEventListener('click', () => {
        recurringExpanded = !recurringExpanded;
        
        if (recurringExpanded) {
            recurringOptions.style.display = 'block';
            toggleBtn.classList.add('expanded');
            document.querySelector('.recurring-section').classList.add('expanded');
        } else {
            recurringOptions.style.display = 'none';
            toggleBtn.classList.remove('expanded');
            document.querySelector('.recurring-section').classList.remove('expanded');
        }
        
        updateSubmitButtonText();
    });
    
    // Handle recurring type change
    if (recurringType && weeklyOptions) {
        recurringType.addEventListener('change', (e) => {
            if (e.target.value === 'weekly') {
                weeklyOptions.style.display = 'block';
            } else {
                weeklyOptions.style.display = 'none';
            }
            updateSubmitButtonText();
        });
    }
    
    // Handle preset buttons
    presetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const preset = e.target.dataset.preset;
            applyRecurringPreset(preset);
        });
    });
    
    // Update submit button text based on recurring settings
    function updateSubmitButtonText() {
        if (!recurringExpanded || recurringType?.value === 'none') {
            submitText.textContent = 'Add Task';
            return;
        }
        
        const count = document.getElementById('recurring-count')?.value || 1;
        const type = recurringType?.value || 'none';
        
        if (type !== 'none') {
            submitText.textContent = `Add ${count} ${type === 'weekly' ? 'Weekly' : type === 'daily' ? 'Daily' : 'Monthly'} Tasks`;
        } else {
            submitText.textContent = 'Add Task';
        }
    }
    
    // Listen for count changes
    const recurringCount = document.getElementById('recurring-count');
    if (recurringCount) {
        recurringCount.addEventListener('input', updateSubmitButtonText);
    }
}

function applyRecurringPreset(preset) {
    const recurringType = document.getElementById('recurring-type');
    const recurringCount = document.getElementById('recurring-count');
    const weeklyOptions = document.getElementById('weekly-options');
    const weekdayCheckboxes = weeklyOptions?.querySelectorAll('input[type="checkbox"]');
    
    // Clear all checkboxes first
    if (weekdayCheckboxes) {
        weekdayCheckboxes.forEach(cb => cb.checked = false);
    }
    
    switch (preset) {
        case 'work-week':
            recurringType.value = 'weekly';
            recurringCount.value = '52'; // Full year
            weeklyOptions.style.display = 'block';
            // Check Mon-Fri (values 1-5)
            [1, 2, 3, 4, 5].forEach(day => {
                const checkbox = weeklyOptions?.querySelector(`input[value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
            break;
            
        case 'weekends':
            recurringType.value = 'weekly';
            recurringCount.value = '26'; // Half year
            weeklyOptions.style.display = 'block';
            // Check Sat-Sun (values 6, 0)
            [6, 0].forEach(day => {
                const checkbox = weeklyOptions?.querySelector(`input[value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
            break;
            
        case 'daily-month':
            recurringType.value = 'daily';
            recurringCount.value = '30';
            weeklyOptions.style.display = 'none';
            break;
            
        case 'weekly-year':
            recurringType.value = 'weekly';
            recurringCount.value = '52';
            weeklyOptions.style.display = 'block';
            // Check the same day as today
            const today = new Date().getDay();
            const todayCheckbox = weeklyOptions?.querySelector(`input[value="${today}"]`);
            if (todayCheckbox) todayCheckbox.checked = true;
            break;
    }
    
    // Update button text
    setTimeout(() => {
        const event = new Event('change');
        recurringType.dispatchEvent(event);
    }, 100);
}

// Generate recurring tasks
function generateRecurringTasks(baseTask) {
    const recurringType = document.getElementById('recurring-type')?.value;
    const recurringCount = parseInt(document.getElementById('recurring-count')?.value) || 1;
    
    if (!recurringExpanded || recurringType === 'none' || recurringCount <= 1) {
        return [baseTask]; // Return single task
    }
    
    const tasks = [];
    const baseDate = new Date(baseTask.date);
    
    switch (recurringType) {
        case 'daily':
            for (let i = 0; i < recurringCount; i++) {
                const taskDate = new Date(baseDate);
                taskDate.setDate(baseDate.getDate() + i);
                tasks.push({
                    ...baseTask,
                    id: Date.now() + i,
                    date: taskDate.toISOString().split('T')[0]
                });
            }
            break;
            
        case 'weekly':
            const selectedDays = getSelectedWeekdays();
            if (selectedDays.length === 0) {
                // If no days selected, use the original day
                selectedDays.push(baseDate.getDay());
            }
            
            let weekCount = 0;
            let taskId = 0;
            
            while (tasks.length < recurringCount) {
                selectedDays.forEach(dayOfWeek => {
                    if (tasks.length >= recurringCount) return;
                    
                    const taskDate = new Date(baseDate);
                    // Calculate the next occurrence of this day
                    const dayDiff = (dayOfWeek - baseDate.getDay() + 7) % 7;
                    taskDate.setDate(baseDate.getDate() + dayDiff + (weekCount * 7));
                    
                    tasks.push({
                        ...baseTask,
                        id: Date.now() + taskId++,
                        date: taskDate.toISOString().split('T')[0]
                    });
                });
                weekCount++;
            }
            break;
            
        case 'monthly':
            for (let i = 0; i < recurringCount; i++) {
                const taskDate = new Date(baseDate);
                taskDate.setMonth(baseDate.getMonth() + i);
                tasks.push({
                    ...baseTask,
                    id: Date.now() + i,
                    date: taskDate.toISOString().split('T')[0]
                });
            }
            break;
    }
    
    return tasks.slice(0, recurringCount);
}

function getSelectedWeekdays() {
    const weeklyOptions = document.getElementById('weekly-options');
    const checkedBoxes = weeklyOptions?.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkedBoxes || []).map(cb => parseInt(cb.value));
}

function resetRecurringForm() {
    const recurringType = document.getElementById('recurring-type');
    const recurringCount = document.getElementById('recurring-count');
    const weeklyOptions = document.getElementById('weekly-options');
    const weekdayCheckboxes = weeklyOptions?.querySelectorAll('input[type="checkbox"]');
    
    if (recurringType) recurringType.value = 'none';
    if (recurringCount) recurringCount.value = '1';
    
    // Uncheck all weekday boxes
    if (weekdayCheckboxes) {
        weekdayCheckboxes.forEach(cb => cb.checked = false);
    }
    
    // Hide weekly options
    if (weeklyOptions) {
        weeklyOptions.style.display = 'none';
    }
}


function showNotification(message) {
    // Create a temporary notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease-out;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Add slide-in animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            notification.remove();
            style.remove();
        }, 300);
    }, 3000);
}

// Task Sidebar Functionality
let sidebarOpen = false;
let selectedSidebarDate = null;

function initializeTaskSidebar() {
    const sidebar = document.getElementById('task-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const sidebarForm = document.getElementById('sidebar-task-form');
    const sidebarToggleRecurring = document.getElementById('sidebar-toggle-recurring');
    const sidebarRecurringOptions = document.getElementById('sidebar-recurring-options');
    const sidebarRecurringType = document.getElementById('sidebar-recurring-type');
    const sidebarWeeklyOptions = document.getElementById('sidebar-weekly-options');
    const sidebarTimeFormatToggle = document.getElementById('sidebar-time-format-toggle');
    
    if (!sidebar) return;
    
    // Close sidebar
    if (closeSidebarBtn) {
        console.log('🔧 Close button found, adding event listener');
        closeSidebarBtn.addEventListener('click', () => {
            console.log('🔧 Close button clicked');
            closeSidebar();
        });
    } else {
        console.error('🚨 Close button not found');
    }
    
    // Handle recurring toggle
    if (sidebarToggleRecurring && sidebarRecurringOptions) {
        sidebarToggleRecurring.addEventListener('click', () => {
            const isExpanded = sidebarRecurringOptions.style.display === 'block';
            const newState = !isExpanded;
            
            sidebarRecurringOptions.style.display = newState ? 'block' : 'none';
            sidebarToggleRecurring.classList.toggle('expanded', newState);
            
            // Update arrow icon
            const toggleIcon = sidebarToggleRecurring.querySelector('.toggle-icon');
            const toggleText = sidebarToggleRecurring.querySelector('.toggle-text');
            const helpText = document.querySelector('.recurring-help-text');
            
            if (toggleIcon) {
                toggleIcon.textContent = newState ? '▼' : '▶';
            }
            
            if (toggleText) {
                toggleText.textContent = newState ? 'Recurring Options' : 'Make Recurring Task';
            }
            
            if (helpText) {
                helpText.style.display = newState ? 'block' : 'none';
            }
            
            // Show a helpful message when first opened
            if (newState) {
                console.log('🔄 Recurring options opened - choose a pattern to create multiple tasks automatically');
                updateRecurringPreview(); // Initialize preview
            } else {
                // Reset submit button text when closing
                updateSubmitButtonText();
            }
        });
    }
    
    // Add event listeners to update preview when settings change
    const recurringType = document.getElementById('sidebar-recurring-type');
    const recurringCount = document.getElementById('sidebar-recurring-count');
    const durationType = document.getElementById('sidebar-duration-type');
    const weekdayCheckboxes = document.querySelectorAll('#sidebar-weekly-options input[type="checkbox"]');
    
    if (recurringType) {
        recurringType.addEventListener('change', updateRecurringPreview);
    }
    if (recurringCount) {
        recurringCount.addEventListener('input', updateRecurringPreview);
    }
    if (durationType) {
        durationType.addEventListener('change', updateRecurringPreview);
    }
    
    weekdayCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateRecurringPreview);
    });
    
    // Initialize enhanced recurring system
    initializeEnhancedRecurring();
    
    // Handle recurring type change
    if (sidebarRecurringType && sidebarWeeklyOptions) {
        sidebarRecurringType.addEventListener('change', (e) => {
            sidebarWeeklyOptions.style.display = e.target.value === 'weekly' ? 'block' : 'none';
        });
    }
    
    // Handle time format toggle
    if (sidebarTimeFormatToggle) {
        sidebarTimeFormatToggle.addEventListener('click', toggleSidebarTimeFormat);
    }

    // Handle alarm toggle
    const sidebarAlarmToggle = document.getElementById('sidebar-alarm-toggle');
    if (sidebarAlarmToggle) {
        sidebarAlarmToggle.addEventListener('click', toggleSidebarAlarm);
    }

    // Handle preset buttons
    const sidebarPresetBtns = sidebar.querySelectorAll('.preset-btn');
    sidebarPresetBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const preset = e.target.dataset.preset;
            applySidebarRecurringPreset(preset);
        });
    });
    
    // Handle form submission
    if (sidebarForm) {
        sidebarForm.addEventListener('submit', handleSidebarFormSubmit);
    }
}

function clearSidebarForm() {
    // Clear form fields
    const taskTitle = document.getElementById('sidebar-task-title');
    const startTime = document.getElementById('sidebar-start-time');
    const endTime = document.getElementById('sidebar-end-time');
    const priority = document.getElementById('sidebar-priority');
    
    if (taskTitle) taskTitle.value = '';
    if (startTime) startTime.value = '';
    if (endTime) endTime.value = '';
    if (priority) priority.value = 'medium';
    
    // Reset recurring options
    const recurringOptions = document.getElementById('sidebar-recurring-options');
    if (recurringOptions) {
        recurringOptions.style.display = 'none';
    }
    
    const recurringType = document.getElementById('sidebar-recurring-type');
    if (recurringType) {
        recurringType.value = 'none';
    }
    
    // Clear weekday checkboxes
    const weekdayCheckboxes = document.querySelectorAll('#sidebar-weekly-options input[type="checkbox"]');
    weekdayCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset alarm toggle
    const alarmToggle = document.getElementById('sidebar-alarm-toggle');
    const alarmInfo = document.getElementById('alarm-info');
    if (alarmToggle) {
        alarmToggle.setAttribute('data-enabled', 'false');
        const icon = alarmToggle.querySelector('.alarm-icon');
        const text = alarmToggle.querySelector('.alarm-text');
        if (icon) icon.textContent = '🔕';
        if (text) {
            text.setAttribute('data-translate', 'alarm_off');
            text.textContent = translate('alarm_off');
        }
        if (alarmInfo) alarmInfo.style.display = 'none';
    }
    
    // Reset submit button text
    updateSubmitButtonText();
}

function showTaskSidebar(dateString) {
    const sidebar = document.getElementById('task-sidebar');
    const sidebarSelectedDate = document.getElementById('sidebar-selected-date');
    
    if (!sidebar) {
        console.error('🚨 Sidebar element not found!');
        return;
    }
    
    selectedSidebarDate = dateString;
    
    // Clear the form before showing
    clearSidebarForm();
    const date = new Date(dateString);
    
    if (sidebarSelectedDate) {
        sidebarSelectedDate.textContent = formatTranslatedDate(date, 'full');
    }
    
    sidebar.classList.add('show');
    document.body.classList.add('sidebar-open');
    
    // Show task form section when opening for task creation
    const taskFormSection = document.getElementById('task-form-section');
    if (taskFormSection) {
        taskFormSection.style.display = 'block';
    }
    sidebarOpen = true;
    
    // Focus on task input
    setTimeout(() => {
        const taskInput = document.getElementById('sidebar-task-title');
        if (taskInput) taskInput.focus();
    }, 300);
}

function closeSidebar() {
    const sidebar = document.getElementById('task-sidebar');
    if (!sidebar) {
        console.error('🚨 Sidebar not found when trying to close');
        return;
    }
    
    sidebar.classList.remove('show');
    document.body.classList.remove('sidebar-open');
    sidebarOpen = false;
    selectedSidebarDate = null;
    
    // Reset form
    const sidebarForm = document.getElementById('sidebar-task-form');
    if (sidebarForm) sidebarForm.reset();
    
    // Hide recurring options
    const recurringOptions = document.getElementById('sidebar-recurring-options');
    if (recurringOptions) recurringOptions.style.display = 'none';
    
    const weeklyOptions = document.getElementById('sidebar-weekly-options');
    if (weeklyOptions) weeklyOptions.style.display = 'none';
    
    // Reset recurring toggle
    const recurringToggle = document.getElementById('sidebar-toggle-recurring');
    if (recurringToggle) recurringToggle.classList.remove('expanded');
}

// Render filtered sidebar tasks
function renderFilteredSidebar() {
    // This function updates the sidebar task display
    // Currently a placeholder that calls displayTasks to refresh task views
    if (typeof displayTasks === 'function') {
        displayTasks();
    }
}

function toggleSidebarTimeFormat() {
    const toggle = document.getElementById('sidebar-time-format-toggle');
    const startTime = document.getElementById('sidebar-start-time');
    const endTime = document.getElementById('sidebar-end-time');
    
    if (!toggle) return;
    
    const is24Hour = toggle.textContent === '24H';
    toggle.textContent = is24Hour ? 'AM/PM' : '24H';
    
    // Update input placeholders and behavior
    if (startTime) startTime.step = is24Hour ? "60" : "300";
    if (endTime) endTime.step = is24Hour ? "60" : "300";
}

function toggleSidebarAlarm() {
    const toggle = document.getElementById('sidebar-alarm-toggle');
    const alarmInfo = document.getElementById('alarm-info');
    
    if (!toggle) return;
    
    const isEnabled = toggle.getAttribute('data-enabled') === 'true';
    const newState = !isEnabled;
    
    // Update button state
    toggle.setAttribute('data-enabled', newState);
    
    // Update visual elements
    const icon = toggle.querySelector('.alarm-icon');
    const text = toggle.querySelector('.alarm-text');
    
    if (newState) {
        icon.textContent = '🔔';
        text.setAttribute('data-translate', 'alarm_on');
        text.textContent = translate('alarm_on');
        alarmInfo.style.display = 'block';
    } else {
        icon.textContent = '🔕';
        text.setAttribute('data-translate', 'alarm_off');
        text.textContent = translate('alarm_off');
        alarmInfo.style.display = 'none';
    }
    
    console.log(`🔔 Alarm toggled: ${newState ? 'ON' : 'OFF'}`);
}

function handleSidebarFormSubmit(e) {
    e.preventDefault();
    
    if (!selectedSidebarDate) return;
    
    const taskText = document.getElementById('sidebar-task-title')?.value.trim();
    const startTime = document.getElementById('sidebar-start-time')?.value || '';
    const endTime = document.getElementById('sidebar-end-time')?.value || '';
    const priority = document.getElementById('sidebar-priority')?.value || 'medium';
    
    if (!taskText) return;
    
    // Get alarm setting
    const alarmToggle = document.getElementById('sidebar-alarm-toggle');
    const alarmEnabled = alarmToggle?.getAttribute('data-enabled') === 'true';
    
    const baseTask = {
        text: taskText,
        date: selectedSidebarDate,
        startTime: startTime,
        endTime: endTime,
        alarmTime: startTime,
        priority: priority,
        alarmEnabled: alarmEnabled,
        completed: false,
        acknowledged: false,
        createdAt: new Date().toISOString()
    };
    
    // Generate recurring tasks or single task
    const tasksToAdd = generateSidebarRecurringTasks(baseTask);
    
    // Add all tasks
    tasksToAdd.forEach(task => addTask(task));
    
    // Show confirmation
    if (tasksToAdd.length > 1) {
        showNotification(`Successfully added ${tasksToAdd.length} recurring tasks!`);
    }
    
    // Close sidebar
    closeSidebar();
}

function generateSidebarRecurringTasks(baseTask) {
    const recurringType = document.getElementById('sidebar-recurring-type')?.value;
    const recurringOptions = document.getElementById('sidebar-recurring-options');
    
    if (!recurringOptions || recurringOptions.style.display === 'none' || recurringType === 'none') {
        return [{ ...baseTask, id: Date.now() }];
    }
    
    // Get duration settings
    const durationType = document.getElementById('sidebar-duration-type')?.value || 'count';
    const recurringCount = parseInt(document.getElementById('sidebar-recurring-count')?.value) || 3;
    const untilDate = document.getElementById('sidebar-until-date')?.value;
    
    const tasks = [];
    const baseDate = new Date(baseTask.date);
    const endDate = untilDate ? new Date(untilDate) : null;
    
    // Determine max iterations based on duration type
    let maxIterations = recurringCount;
    if (durationType === 'until' && endDate) {
        maxIterations = Math.min(365, recurringCount); // Safety limit
    } else if (durationType === 'forever') {
        maxIterations = 365; // Limit to 1 year for forever option
    }
    
    switch (recurringType) {
        case 'daily':
            const dailyInterval = parseInt(document.getElementById('sidebar-daily-interval')?.value) || 1;
            const dailyType = document.getElementById('sidebar-daily-type')?.value || 'day';
            
            let dayCount = 0;
            for (let i = 0; i < maxIterations && dayCount < maxIterations; i++) {
                const taskDate = new Date(baseDate);
                
                if (dailyType === 'weekday') {
                    // Skip weekends
                    taskDate.setDate(baseDate.getDate() + dayCount);
                    while (taskDate.getDay() === 0 || taskDate.getDay() === 6) {
                        dayCount++;
                        taskDate.setDate(baseDate.getDate() + dayCount);
                    }
                } else if (dailyType === 'weekend') {
                    // Only weekends
                    taskDate.setDate(baseDate.getDate() + dayCount);
                    while (taskDate.getDay() !== 0 && taskDate.getDay() !== 6) {
                        dayCount++;
                        taskDate.setDate(baseDate.getDate() + dayCount);
                    }
                } else {
                    // Every day
                    taskDate.setDate(baseDate.getDate() + (dayCount * dailyInterval));
                }
                
                // Check if we've reached the end date
                if (endDate && taskDate > endDate) break;
                
                tasks.push({
                    ...baseTask,
                    id: Date.now() + i,
                    date: taskDate.toISOString().split('T')[0],
                    recurring: true,
                    recurringInfo: `Daily (every ${dailyInterval} ${dailyType})`
                });
                
                dayCount += dailyInterval;
            }
            break;
            
        case 'weekly':
            const selectedDays = getSidebarSelectedWeekdays();
            if (selectedDays.length === 0) {
                selectedDays.push(baseDate.getDay());
            }
            
            let weekCount = 0;
            let taskId = 0;
            
            while (tasks.length < maxIterations) {
                let addedThisWeek = false;
                
                selectedDays.forEach(dayOfWeek => {
                    if (tasks.length >= maxIterations) return;
                    
                    const taskDate = new Date(baseDate);
                    const dayDiff = (dayOfWeek - baseDate.getDay() + 7) % 7;
                    taskDate.setDate(baseDate.getDate() + dayDiff + (weekCount * 7));
                    
                    // Check if we've reached the end date
                    if (endDate && taskDate > endDate) return;
                    
                    tasks.push({
                        ...baseTask,
                        id: Date.now() + taskId++,
                        date: taskDate.toISOString().split('T')[0],
                        recurring: true,
                        recurringInfo: `Weekly on ${getTranslatedDayName(dayOfWeek)}`
                    });
                    
                    addedThisWeek = true;
                });
                
                if (!addedThisWeek) break;
                weekCount++;
            }
            break;
            
        case 'monthly':
            const monthlyPattern = document.querySelector('input[name="monthly-pattern"]:checked')?.value || 'date';
            
            for (let i = 0; i < maxIterations; i++) {
                const taskDate = new Date(baseDate);
                
                if (monthlyPattern === 'date') {
                    // Same date each month
                    taskDate.setMonth(baseDate.getMonth() + i);
                } else {
                    // Same weekday pattern (e.g., 2nd Friday)
                    const weekOfMonth = Math.ceil(baseDate.getDate() / 7);
                    const dayOfWeek = baseDate.getDay();
                    
                    taskDate.setMonth(baseDate.getMonth() + i, 1);
                    const firstDayOfMonth = taskDate.getDay();
                    const targetDate = 1 + (dayOfWeek - firstDayOfMonth + 7) % 7 + (weekOfMonth - 1) * 7;
                    taskDate.setDate(targetDate);
                    
                    // If target date doesn't exist in month, skip
                    if (taskDate.getMonth() !== (baseDate.getMonth() + i) % 12) {
                        continue;
                    }
                }
                
                // Check if we've reached the end date
                if (endDate && taskDate > endDate) break;
                
                tasks.push({
                    ...baseTask,
                    id: Date.now() + i,
                    date: taskDate.toISOString().split('T')[0],
                    recurring: true,
                    recurringInfo: `Monthly (${monthlyPattern === 'date' ? 'same date' : 'same weekday'})`
                });
            }
            break;
            
        case 'custom':
            const customSchedule = document.getElementById('sidebar-custom-schedule')?.value;
            if (customSchedule) {
                // For now, create a single task with custom note
                tasks.push({
                    ...baseTask,
                    id: Date.now(),
                    recurring: true,
                    recurringInfo: `Custom: ${customSchedule}`,
                    text: `${baseTask.text} (Custom: ${customSchedule})`
                });
            } else {
                return [{ ...baseTask, id: Date.now() }];
            }
            break;
    }
    
    console.log(`📅 Generated ${tasks.length} recurring tasks (${recurringType})`);
    return tasks;
}

function getSidebarSelectedWeekdays() {
    const weeklyOptions = document.getElementById('sidebar-weekly-options');
    const checkedBoxes = weeklyOptions?.querySelectorAll('input[type="checkbox"]:checked');
    return Array.from(checkedBoxes || []).map(cb => parseInt(cb.value));
}

// Toggle between AM/PM and 24h formats
function toggleTimeFormat() {
  is24HourFormat = !is24HourFormat;
  updateTimeFormatToggle();
  updateTimeInputs();
  // Re-render the calendar to update time display
  renderCurrentView();
}

// Remove old minute dropdown functions - no longer needed

// Initialize the time-slot calendar hours and controls
function initializeTimeslotCalendar() {
  // Build hour slots for 6 AM to 11 PM
  timeSlots = [];
  for (let h = 6; h <= 23; h++) {
    timeSlots.push({ hour: h, display: formatHour(h) });
  }
  setupViewControls();
  renderCurrentView();
}

function formatHour(h) {
  if (is24HourFormat) return `${h.toString().padStart(2, '0')}:00`;
  const suffix = h < 12 ? 'AM' : 'PM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12} ${suffix}`;
}

// Hook up view switching and period navigation
function setupViewControls() {
  const viewButtons = document.querySelectorAll('.view-btn');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      viewButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentView = btn.getAttribute('data-view') || 'week';
      renderCurrentView();
    });
  });

  const prevBtn = document.getElementById('prev-period');
  const nextBtn = document.getElementById('next-period');
  if (prevBtn) prevBtn.addEventListener('click', () => navigatePeriod(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => navigatePeriod(1));
}

function navigatePeriod(direction) {
  const d = new Date(currentCalendarDate);
  switch (currentView) {
    case 'day':
      d.setDate(d.getDate() + (direction > 0 ? 1 : -1));
      break;
    case 'week':
      d.setDate(d.getDate() + (direction > 0 ? 7 : -7));
      break;
    case 'month':
      d.setMonth(d.getMonth() + (direction > 0 ? 1 : -1));
      break;
    case 'year':
      d.setFullYear(d.getFullYear() + (direction > 0 ? 1 : -1));
      break;
  }
  currentCalendarDate = d;
  renderCurrentView();
}

function renderCurrentView() {
  const timeslotEl = document.getElementById('timeslot-calendar');
  const monthViewEl = document.getElementById('month-view');
  if (!timeslotEl || !monthViewEl) return;

  if (currentView === 'day' || currentView === 'week') {
    timeslotEl.classList.remove('hidden');
    monthViewEl.classList.add('hidden');
    renderTimeslotView();
  } else {
    timeslotEl.classList.add('hidden');
    monthViewEl.classList.remove('hidden');
    renderCalendar();
  }
  updatePeriodDisplay();
}

function updatePeriodDisplay() {
  const el = document.getElementById('current-period');
  if (!el) {
    console.warn('⚠️ current-period element not found');
    return;
  }
  const date = new Date(currentCalendarDate);
  let text = '';
  
  console.log(`🗓️ Updating period display for ${currentView} view, language: ${currentLanguage}`);
  
  switch (currentView) {
    case 'day':
      text = formatTranslatedDate(date, 'full');
      break;
    case 'week':
      const s = new Date(date);
      s.setDate(date.getDate() - date.getDay());
      const e = new Date(s);
      e.setDate(s.getDate() + 6);
      text = `${formatTranslatedDate(s, 'shortDate')} - ${formatTranslatedDate(e, 'shortDate')}, ${e.getFullYear()}`;
      break;
    case 'month':
      text = formatTranslatedDate(date, 'monthYear');
      break;
    case 'year':
      text = date.getFullYear().toString();
      break;
  }
  
  console.log(`📝 Period display text: "${text}"`);
  el.textContent = text;
}

// Render timeslot view (day/week)
function renderTimeslotView() {
    const container = document.querySelector('.calendar-grid-container');
    if (!container) return;
    
    // Create time column
    const timeColumn = container.querySelector('.time-column');
    if (timeColumn) {
        let timeHtml = '<div class="time-header"></div>';
        timeSlots.forEach(slot => {
            timeHtml += `<div class="time-slot">${slot.display}</div>`;
        });
        timeColumn.innerHTML = timeHtml;
    }
    
    // Create days grid
    const daysGrid = container.querySelector('.days-grid');
    if (daysGrid) {
        const days = getDaysForView();
        daysGrid.style.gridTemplateColumns = `repeat(${days.length}, 1fr)`;
        
        let daysHtml = '';
        days.forEach(day => {
            daysHtml += createDayColumn(day);
        });
        
        daysGrid.innerHTML = daysHtml;
        
        // Add click handlers for time blocks
        addTimeBlockHandlers();
    }
}

// Get days for current view
function getDaysForView() {
    const days = [];
    const baseDate = new Date(currentCalendarDate);
    
    if (currentView === 'day') {
        days.push(new Date(baseDate));
    } else if (currentView === 'week') {
        // Start from Sunday of the current week
        const startOfWeek = new Date(baseDate);
        startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
        
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            days.push(day);
        }
    }
    
    return days;
}

// Create day column HTML
function createDayColumn(date) {
    const dayName = formatTranslatedDate(date, 'dayOnly');
    const dayNumber = date.getDate();
    const dateStr = date.toISOString().split('T')[0];
    
    let html = `
        <div class="day-column" data-date="${dateStr}">
            <div class="day-header">
                <div class="day-name">${dayName}</div>
                <div class="day-number">${dayNumber}</div>
            </div>
    `;
    
    // Add time blocks for each hour
    timeSlots.forEach(slot => {
        const tasksForSlot = getTasksForTimeSlot(dateStr, slot.hour);
        const hasTask = tasksForSlot.length > 0;
        
        html += `
            <div class="time-block ${hasTask ? 'has-task' : ''}" 
                 data-date="${dateStr}" 
                 data-hour="${slot.hour}">
        `;
        
        // Add task blocks
        tasksForSlot.forEach(task => {
            const timeRange = task.endTime ? 
                `${formatTimeDisplay(task.startTime)} - ${formatTimeDisplay(task.endTime)}` : 
                formatTimeDisplay(task.startTime);
            
            // Add alarm icon if alarm is enabled
            const alarmIcon = task.alarmEnabled ? 
                `<span class="task-alarm-icon" title="Alarm enabled - will ring 5 minutes before and at scheduled time">🔔</span>` : 
                '';
            
            html += `
                <div class="task-block ${task.priority}-priority" title="${task.text} (${timeRange})${task.alarmEnabled ? ' - Alarm Enabled' : ''}">
                    <div class="task-title">${alarmIcon}${task.text}</div>
                    <div class="task-time">${timeRange}</div>
                </div>
            `;
        });
        
        html += '</div>';
    });
    
    html += '</div>';
    return html;
}

// Get tasks for specific time slot
function getTasksForTimeSlot(dateStr, hour) {
    return tasks.filter(task => {
        if (task.date !== dateStr) return false;
        
        // Check if task falls in this hour slot
        if (task.startTime) {
            const taskHour = parseInt(task.startTime.split(':')[0]);
            if (task.endTime) {
                const endHour = parseInt(task.endTime.split(':')[0]);
                const endMinute = parseInt(task.endTime.split(':')[1]);
                // Task spans from start hour through end hour (inclusive if there are minutes)
                return hour >= taskHour && (hour < endHour || (hour === endHour && endMinute > 0));
            } else {
                // No end time, show in start hour only
                return hour === taskHour;
            }
        }
        
        return false;
    });
}

// Add click handlers for time blocks
function addTimeBlockHandlers() {
    // Add handlers for time blocks
    document.querySelectorAll('.time-block').forEach(block => {
        block.addEventListener('click', function() {
            const date = this.dataset.date;
            const hour = parseInt(this.dataset.hour);
            
            // Show sidebar with pre-filled time
            showTaskSidebar(date);
            
            // Pre-fill start time in sidebar
            setTimeout(() => {
                const sidebarStartTime = document.getElementById('sidebar-start-time');
                if (sidebarStartTime) {
                    sidebarStartTime.value = `${hour.toString().padStart(2, '0')}:00`;
                }
            }, 100);
        });
    });
    
    // Add handlers for day headers
    document.querySelectorAll('.day-header').forEach(header => {
        const dayColumn = header.closest('.day-column');
        if (dayColumn) {
            header.addEventListener('click', function() {
                const date = dayColumn.dataset.date;
                showTaskSidebar(date);
            });
            
            // Make header look clickable
            header.style.cursor = 'pointer';
            header.title = 'Click to add task for this day';
        }
    });
}

// Render traditional calendar (month view)
function renderTraditionalCalendar() {
    // Use existing renderCalendar function for month view
    renderCalendar();
}

// Highlight task in calendar when clicked from sidebar
function highlightTaskInCalendar(taskId) {
    const task = tasks.find(t => t.id.toString() === taskId);
    if (!task) return;
    
    // Navigate to the task's date
    const taskDate = new Date(task.date);
    currentCalendarDate.setFullYear(taskDate.getFullYear());
    currentCalendarDate.setMonth(taskDate.getMonth());
    
    // Re-render calendar
    renderCalendar();
    
    // Highlight the specific day
    setTimeout(() => {
        const dayElements = document.querySelectorAll('.calendar-day');
        dayElements.forEach(day => {
            if (day.dataset.date === task.date) {
                day.classList.add('highlighted');
                day.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Remove highlight after 3 seconds
                setTimeout(() => {
                    day.classList.remove('highlighted');
                }, 3000);
            }
        });
    }, 100);
}

// Update priority select color based on selected value
function updatePrioritySelectColor() {
    if (!prioritySelect) return;
    
    const selectedPriority = prioritySelect.value;
    
    // Remove existing data-priority attributes
    prioritySelect.removeAttribute('data-priority');
    
    // Set new data-priority attribute based on selection
    if (selectedPriority) {
        prioritySelect.setAttribute('data-priority', selectedPriority);
    }
    
    console.log('Priority select color updated to:', selectedPriority);
}

// Initialize when both DOM and window are fully loaded
// Language and Accessibility Functions
function translate(key) {
    console.log(`🔤 Translating key: ${key}, Language: ${currentLanguage}`);
    
    if (!translations[currentLanguage]) {
        console.error(`❌ No translations found for language: ${currentLanguage}`);
        return key;
    }
    
    const translated = translations[currentLanguage][key] || translations['en'][key] || key;
    console.log(`🌐 Translation result: ${key} -> ${translated}`);
    return translated;
}

function updateLanguage(langCode) {
    console.log('🚀 Starting language update to:', langCode);
    currentLanguage = langCode;
    
    // Check if translations exist for this language
    if (!translations[langCode]) {
        console.error('❌ Language not found in translations:', langCode);
        return;
    }
    
    console.log('✅ Language found, starting translation...');
    
    // Update all elements with data-translate attribute
    const elements = document.querySelectorAll('[data-translate]');
    console.log(`📝 Found ${elements.length} elements to translate`);
    
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-translate');
        const translatedText = translate(key);
        
        console.log(`🔄 Element ${index + 1}: ${key} -> "${translatedText}"`);
        
        // Simply update the text content - we've removed conflicting attributes
        element.textContent = translatedText;
    });
    
    // Update placeholders
    document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = translate(key);
    });
    
    // Update placeholders and other text
    updateUITexts();
    
    // Update dynamic content that uses translations
    updateDynamicTranslations();
    
    // Save language preference
    localStorage.setItem('task-tracker-language', langCode);
    
    // Update calendar after language change - force complete re-render
    updatePeriodDisplay();
    
    // Re-render all calendar views to update translations
    renderCurrentView(); // This will call the appropriate render function based on current view
    
    // Also force re-render of month calendar if it exists
    renderCalendar();
    
    // Force update all month display elements to ensure nothing is missed
    forceUpdateAllMonthDisplays();
    
    // Re-render sidebar tasks to update task displays
    displayTasks();
}

// Force update all month display elements
function forceUpdateAllMonthDisplays() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();
    const monthKey = `month_${month}`;
    const monthName = translations[currentLanguage][monthKey] || translations['en'][monthKey];
    const monthYearText = `${monthName} ${year}`;
    
    console.log(`🔄 forceUpdateAllMonthDisplays: Setting "${monthYearText}" in ${currentLanguage}`);
    
    // Update all possible month display elements
    const monthDisplayElements = [
        document.getElementById('current-period'),
        document.getElementById('current-month'),
        currentMonthDisplay
    ];
    
    monthDisplayElements.forEach((element, index) => {
        if (element) {
            console.log(`📅 Updating month display element ${index + 1}: ${element.id || 'currentMonthDisplay'}`);
            element.textContent = monthYearText;
        }
    });
    
    // Also check for any elements with class that might contain month names
    const monthElements = document.querySelectorAll('.month-display, .current-month, .calendar-header');
    monthElements.forEach((element, index) => {
        console.log(`📅 Updating month element with class ${element.className}`);
        element.textContent = monthYearText;
    });
}

// Translation helper functions for calendar dates
function getTranslatedMonthName(monthIndex) {
    const key = `month_${monthIndex}`;
    const translatedName = translate(key);
    
    // Enhanced debugging
    console.log(`📅 getTranslatedMonthName: month ${monthIndex} (${key})`);
    console.log(`   Current language: ${currentLanguage}`);
    console.log(`   Translated to: "${translatedName}"`);
    console.log(`   Available in current language:`, translations[currentLanguage] && translations[currentLanguage][key] ? 'YES' : 'NO');
    
    return translatedName;
}

function getTranslatedDayName(dayIndex) {
    const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    return translate(dayKeys[dayIndex]);
}

function getTranslatedFullDayName(dayIndex) {
    const dayKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return translate(dayKeys[dayIndex]);
}

function formatTranslatedDate(date, format = 'full') {
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const dayIndex = date.getDay();
    
    switch (format) {
        case 'full':
            // "Monday, January 15, 2024"
            return `${getTranslatedFullDayName(dayIndex)}, ${getTranslatedMonthName(month)} ${day}, ${year}`;
        case 'monthYear':
            // "January 2024"
            return `${getTranslatedMonthName(month)} ${year}`;
        case 'shortDate':
            // "Jan 15"
            return `${getTranslatedMonthName(month).substring(0, 3)} ${day}`;
        case 'dayOnly':
            // "Mon"
            return getTranslatedDayName(dayIndex);
        default:
            return `${getTranslatedMonthName(month)} ${day}, ${year}`;
    }
}

function updateUITexts() {
    // Update placeholders
    const placeholders = {
        'sidebar-task-title': translate('task_title'),
        'search-tasks': translate('search_placeholder')
    };
    
    Object.entries(placeholders).forEach(([id, text]) => {
        const element = document.getElementById(id);
        if (element) {
            element.placeholder = text;
        }
    });
    
    // Update button text content
    const buttons = {
        'sidebar-submit-btn': translate('save_task')
    };
    
    Object.entries(buttons).forEach(([className, text]) => {
        const element = document.querySelector(`.${className}`) || document.getElementById(className);
        if (element) {
            element.textContent = text;
        }
    });
}

function updateDynamicTranslations() {
    // Update floating tab titles
    const suggestionsTab = document.querySelector('.tab-btn[data-tab="suggestions"]');
    if (suggestionsTab) {
        suggestionsTab.textContent = translate('suggestions');
    }
    
    // Update suggestion form elements that might not have data-translate
    const nameLabel = document.querySelector('label[for="user-name"]');
    if (nameLabel) {
        nameLabel.textContent = translate('name_label');
    }
    
    const emailLabel = document.querySelector('label[for="user-email"]');
    if (emailLabel) {
        emailLabel.textContent = translate('email_label');
    }
    
    const suggestionsLabel = document.querySelector('label[for="user-suggestions"]');
    if (suggestionsLabel) {
        suggestionsLabel.textContent = translate('suggestions_label');
    }

    // Update form placeholders
    const nameInput = document.getElementById('user-name');
    if (nameInput) {
        nameInput.placeholder = translate('name_placeholder');
    }
    
    const emailInput = document.getElementById('user-email');
    if (emailInput) {
        emailInput.placeholder = translate('email_placeholder');
    }
    
    const suggestionsTextarea = document.getElementById('user-suggestions');
    if (suggestionsTextarea) {
        suggestionsTextarea.placeholder = translate('suggestions_placeholder');
    }
    
    // Update submit button
    const submitBtn = document.getElementById('submit-suggestions');
    if (submitBtn) {
        submitBtn.textContent = translate('submit_suggestions');
    }
    
    // Update select options
    const prioritySelect = document.getElementById('sidebar-priority');
    if (prioritySelect) {
        const options = prioritySelect.querySelectorAll('option');
        if (options[0]) options[0].textContent = translate('high');
        if (options[1]) options[1].textContent = translate('medium');
        if (options[2]) options[2].textContent = translate('low');
    }
    
    // Update recurring select options
    const recurringSelect = document.getElementById('sidebar-recurring-type');
    if (recurringSelect) {
        const options = recurringSelect.querySelectorAll('option');
        if (options[0]) options[0].textContent = translate('daily');
        if (options[1]) options[1].textContent = translate('weekly');
        if (options[2]) options[2].textContent = translate('monthly');
    }
    
    // Set text direction for Arabic
    if (currentLanguage === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

function initializeLanguage() {
    const languageSelect = document.getElementById('language-select');
    console.log('Initializing language system...');
    
    // Load saved language or default to English
    const savedLanguage = localStorage.getItem('task-tracker-language') || 'en';
    currentLanguage = savedLanguage;
    
    if (languageSelect) {
        console.log('Language select element found');
        languageSelect.value = savedLanguage;
        
        // Initial translation
        updateLanguage(savedLanguage);
        
        // Add event listener for language changes
        languageSelect.addEventListener('change', (e) => {
            console.log('Language changed to:', e.target.value);
            updateLanguage(e.target.value);
        });
    } else {
        console.error('Language select element not found!');
    }
}



// Search functionality
function setupSearchFeature() {
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (clearSearchBtn) {
            clearSearchBtn.style.display = query ? 'block' : 'none';
        }
        
        // Debounced search
        searchTimeout = setTimeout(() => {
            searchTasks(query);
        }, 300);
    });
    
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            clearSearchBtn.style.display = 'none';
            searchTasks(''); // Show all tasks
        });
    }
}

function searchTasks(query) {
    const taskItems = document.querySelectorAll('.task-item');
    let hasResults = false;
    
    taskItems.forEach(item => {
        if (!query) {
            item.classList.remove('search-hidden', 'search-match');
            hasResults = true;
            return;
        }
        
        const taskText = item.textContent.toLowerCase();
        const isMatch = taskText.includes(query);
        
        if (isMatch) {
            item.classList.remove('search-hidden');
            item.classList.add('search-match');
            hasResults = true;
        } else {
            item.classList.add('search-hidden');
            item.classList.remove('search-match');
        }
    });
    
    // Show no results message if needed
    updateSearchResultsMessage(hasResults, query);
}

function updateSearchResultsMessage(hasResults, query) {
    let messageEl = document.getElementById('search-no-results');
    
    if (!hasResults && query) {
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.id = 'search-no-results';
            messageEl.className = 'search-no-results';
            messageEl.style.cssText = `
                text-align: center;
                padding: 20px;
                color: #666;
                font-style: italic;
                background: rgba(255, 255, 255, 0.7);
                border-radius: 10px;
                margin: 20px;
            `;
            
            // Insert after calendar or at start of main content
            const calendar = document.querySelector('.calendar-layout');
            if (calendar) {
                calendar.parentNode.insertBefore(messageEl, calendar.nextSibling);
            }
        }
        messageEl.textContent = `No tasks found for "${query}"`;
        messageEl.style.display = 'block';
    } else if (messageEl) {
        messageEl.style.display = 'none';
    }
}

// Quick Add Modal functionality
function setupQuickAdd() {
    if (!quickAddBtn || !quickAddModal) return;
    
    quickAddBtn.addEventListener('click', () => {
        quickAddModal.style.display = 'flex';
        if (quickTaskInput) {
            quickTaskInput.focus();
            // Set default date to today
            if (quickDate) {
                quickDate.value = new Date().toISOString().split('T')[0];
            }
        }
    });
    
    // Close modal handlers
    const closeBtn = document.getElementById('close-quick-add');
    const cancelBtn = document.getElementById('cancel-quick-add');
    
    [closeBtn, cancelBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', closeQuickAddModal);
        }
    });
    
    // Close on overlay click
    quickAddModal.addEventListener('click', (e) => {
        if (e.target === quickAddModal) {
            closeQuickAddModal();
        }
    });
    
    // Handle form submission
    if (quickAddForm) {
        quickAddForm.addEventListener('submit', handleQuickAddSubmit);
    }
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+N or Cmd+N for quick add
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            quickAddBtn?.click();
        }
        
        // Escape to close modal
        if (e.key === 'Escape' && quickAddModal.style.display === 'flex') {
            closeQuickAddModal();
        }
        
        // Ctrl+F or Cmd+F for search focus
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput?.focus();
        }
        
        // Ctrl+A or Cmd+A to select all tasks (when not in input)
        if ((e.ctrlKey || e.metaKey) && e.key === 'a' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
            e.preventDefault();
            selectAllBtn?.click();
        }
        
        // Delete key to delete selected tasks
        if (e.key === 'Delete' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
            const selectedTasks = getSelectedTasks();
            if (selectedTasks.length > 0) {
                e.preventDefault();
                deleteSelectedBtn?.click();
            }
        }
        
        // Ctrl+E or Cmd+E for export
        if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
            e.preventDefault();
            exportBtn?.click();
        }
    });
}

function closeQuickAddModal() {
    if (quickAddModal) {
        quickAddModal.style.display = 'none';
        if (quickAddForm) {
            quickAddForm.reset();
        }
    }
}

function handleQuickAddSubmit(e) {
    e.preventDefault();
    
    const taskText = quickTaskInput?.value?.trim();
    const taskDate = quickDate?.value;
    const taskPriority = quickPriority?.value || 'medium';
    
    if (!taskText) return;
    
    // Create task object
    const task = {
        id: Date.now(),
        text: taskText,
        priority: taskPriority,
        completed: false,
        day: taskDate || new Date().toISOString().split('T')[0]
    };
    
    // Add task using existing function
    addTask(task);
    
    // Close modal and show success message
    closeQuickAddModal();
    showNotification(`✅ Task "${taskText}" added successfully!`);
}

// Export/Import functionality
function setupDataManagement() {
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTasks);
    }
    
    if (importBtn && importInput) {
        importBtn.addEventListener('click', () => importInput.click());
        importInput.addEventListener('change', importTasks);
    }
}

function exportTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    const settings = {
        language: localStorage.getItem('language') || 'en',
        exportDate: new Date().toISOString()
    };
    
    const exportData = {
        tasks,
        settings,
        version: '2.0'
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `task-tracker-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('📤 Tasks exported successfully!');
}

function importTasks(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importData = JSON.parse(e.target.result);
            
            // Validate data structure
            if (!importData.tasks || !Array.isArray(importData.tasks)) {
                throw new Error('Invalid file format');
            }
            
            // Confirm import
            const confirmImport = confirm(
                `Import ${importData.tasks.length} tasks?\n\nThis will replace all existing tasks. This action cannot be undone.`
            );
            
            if (!confirmImport) return;
            
            // Import tasks
            localStorage.setItem('tasks', JSON.stringify(importData.tasks));
            
            // Import settings if available
            if (importData.settings?.language) {
                localStorage.setItem('language', importData.settings.language);
                currentLanguage = importData.settings.language;
            }
            
            // Refresh the app
            loadTasks();
            renderCalendar();
            
            showNotification(`✅ Successfully imported ${importData.tasks.length} tasks!`);
            
        } catch (error) {
            console.error('Import error:', error);
            showNotification('❌ Failed to import tasks. Please check the file format.');
        }
    };
    
    reader.readAsText(file);
}

// Sidebar toggle functionality
function setupSidebarToggle() {
    if (!sidebarToggleBtn || !taskSidebar) return;
    
    sidebarToggleBtn.addEventListener('click', () => {
        const isOpen = taskSidebar.classList.contains('show');
        
        if (isOpen) {
            closeSidebar();
        } else {
            // Open sidebar in tools mode (not task creation mode)
            taskSidebar.classList.add('show');
            document.body.classList.add('sidebar-open');
            
            // Hide task form section when opening in tools mode
            const taskFormSection = document.getElementById('task-form-section');
            if (taskFormSection) {
                taskFormSection.style.display = 'none';
            }
        }
    });
}

// Bulk operations functionality
function setupBulkOperations() {
    if (!bulkActions) return;
    
    // Select all button
    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', () => {
            const checkboxes = document.querySelectorAll('.task-checkbox');
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            
            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
                toggleTaskSelection(cb);
            });
            
            selectAllBtn.textContent = allChecked ? 'Select All' : 'Deselect All';
        });
    }
    
    // Delete selected button
    if (deleteSelectedBtn) {
        deleteSelectedBtn.addEventListener('click', () => {
            const selectedTasks = getSelectedTasks();
            if (selectedTasks.length === 0) {
                showNotification('No tasks selected');
                return;
            }
            
            const confirmDelete = confirm(`Delete ${selectedTasks.length} selected task(s)?`);
            if (confirmDelete) {
                deleteSelectedTasks(selectedTasks);
            }
        });
    }
    
    // Complete selected button
    if (completeSelectedBtn) {
        completeSelectedBtn.addEventListener('click', () => {
            const selectedTasks = getSelectedTasks();
            if (selectedTasks.length === 0) {
                showNotification('No tasks selected');
                return;
            }
            
            completeSelectedTasks(selectedTasks);
        });
    }
}

function addTaskCheckbox(taskElement, taskId) {
    if (taskElement.querySelector('.task-checkbox')) return; // Already has checkbox
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.dataset.taskId = taskId;
    
    checkbox.addEventListener('change', () => {
        toggleTaskSelection(checkbox);
        updateBulkActionsVisibility();
    });
    
    taskElement.insertBefore(checkbox, taskElement.firstChild);
    
    // Wrap existing content
    const existingContent = Array.from(taskElement.children).slice(1);
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'task-content';
    
    existingContent.forEach(child => {
        contentWrapper.appendChild(child);
    });
    
    taskElement.appendChild(contentWrapper);
}

function toggleTaskSelection(checkbox) {
    const taskElement = checkbox.closest('.task-item');
    if (taskElement) {
        taskElement.classList.toggle('selected', checkbox.checked);
    }
}

function updateBulkActionsVisibility() {
    const selectedCount = document.querySelectorAll('.task-checkbox:checked').length;
    
    if (bulkActions) {
        bulkActions.style.display = selectedCount > 0 ? 'flex' : 'none';
    }
    
    // Update select all button text
    if (selectAllBtn) {
        const totalCheckboxes = document.querySelectorAll('.task-checkbox').length;
        const allSelected = selectedCount === totalCheckboxes && totalCheckboxes > 0;
        selectAllBtn.textContent = allSelected ? 'Deselect All' : 'Select All';
    }
}

function getSelectedTasks() {
    const selectedCheckboxes = document.querySelectorAll('.task-checkbox:checked');
    return Array.from(selectedCheckboxes).map(cb => ({
        id: cb.dataset.taskId,
        element: cb.closest('.task-item')
    }));
}

function deleteSelectedTasks(selectedTasks) {
    selectedTasks.forEach(task => {
        // Remove from DOM
        if (task.element) {
            task.element.remove();
        }
        
        // Remove from storage
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(t => t.id.toString() !== task.id);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    updateBulkActionsVisibility();
    showNotification(`🗑️ Deleted ${selectedTasks.length} task(s)`);
}

function completeSelectedTasks(selectedTasks) {
    selectedTasks.forEach(task => {
        const taskElement = task.element;
        if (taskElement) {
            // Toggle completion visually
            taskElement.classList.add('completed');
            
            // Update in storage
            let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            const taskIndex = tasks.findIndex(t => t.id.toString() === task.id);
            if (taskIndex !== -1) {
                tasks[taskIndex].completed = true;
            }
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    });
    
    // Clear selections
    document.querySelectorAll('.task-checkbox:checked').forEach(cb => {
        cb.checked = false;
        toggleTaskSelection(cb);
    });
    
    updateBulkActionsVisibility();
    showNotification(`✅ Completed ${selectedTasks.length} task(s)`);
}

function initializeApp() {
    try {
    // Check if all elements exist
    const debugElements = {
        'prev-period': document.getElementById('prev-period'),
        'next-period': document.getElementById('next-period'), 
        'current-period': document.getElementById('current-period'),
        'year-select': document.getElementById('year-select'),
        'time-format-toggle': document.getElementById('time-format-toggle'),
        'start-time': document.getElementById('start-time'),
        'end-time': document.getElementById('end-time')
    };
    
    // Initialize DOM elements with error checking
    form = document.getElementById('task-form');
    input = document.getElementById('task-input');
    prioritySelect = document.getElementById('priority-select');
    yearSelect = document.getElementById('year-select');
    timeFormatToggle = document.getElementById('time-format-toggle');
    alarmAudio = document.getElementById('alarm-audio');
    
    // Initialize form elements
    quickForm = document.getElementById('quick-task-form');
    cancelFormBtn = document.getElementById('cancel-form');
    selectedDateTitle = document.getElementById('selected-date');
    
    // Initialize notification elements
    notificationSidebar = document.getElementById('notification-sidebar');
    closeNotificationsBtn = document.getElementById('close-notifications');
    activeNotifications = document.getElementById('active-notifications');
    mainContent = document.querySelector('.main-content');
    
    // Initialize search and quick add elements
    searchInput = document.getElementById('search-input');
    clearSearchBtn = document.getElementById('clear-search');
    quickAddBtn = document.getElementById('quick-add-btn');
    exportBtn = document.getElementById('export-btn');
    importBtn = document.getElementById('import-btn');
    importInput = document.getElementById('import-input');
    quickAddModal = document.getElementById('quick-add-modal');
    quickAddForm = document.getElementById('quick-add-form');
    quickTaskInput = document.getElementById('quick-task-input');
    quickDate = document.getElementById('quick-date');
    quickPriority = document.getElementById('quick-priority');
    
    // Initialize bulk operations elements
    bulkActions = document.getElementById('bulk-actions');
    selectAllBtn = document.getElementById('select-all-btn');
    deleteSelectedBtn = document.getElementById('delete-selected-btn');
    completeSelectedBtn = document.getElementById('complete-selected-btn');
    
    // Initialize sidebar toggle elements
    sidebarToggleBtn = document.getElementById('sidebar-toggle');
    taskSidebar = document.getElementById('task-sidebar');
  // Optional list element if present in DOM
  list = document.getElementById('task-list') || document.getElementById('tasks-list') || document.querySelector('.task-list') || null;
    
    // Initialize calendar elements
    // Support both legacy (prev/next/current-month) and new (prev/next/current-period) IDs
    prevMonthBtn = document.getElementById('prev-month') || document.getElementById('prev-period');
    nextMonthBtn = document.getElementById('next-month') || document.getElementById('next-period');
    currentMonthDisplay = document.getElementById('current-month') || document.getElementById('current-period');
    calendarDays = document.getElementById('calendar-days');
    if (!calendarDays) {
        console.warn('⚠️ calendar-days container not found; month view may be hidden initially.');
    }
    
    loadTasks();
    initializeCalendar();
    setupFormHandlers();
    setupNotificationSystem();
  // Sidebar removed
    initializeAlarmAudio(); // Initialize alarm sound system  
    setupAlarmHandlers(); // Setup alarm UI handlers
    startNotificationChecker();
    startAlarmMonitoring(); // Start monitoring for task alarms
    initializeRecurringSection(); // Initialize recurring task functionality
    initializeTaskSidebar(); // Initialize task sidebar functionality
    initializeLanguage(); // Initialize language features
    
    // Initialize new features
    setupSearchFeature();
    setupQuickAdd();
    setupDataManagement();
    setupBulkOperations();
    setupSidebarToggle();
    
    // Initialize dropdowns
    
    // Force year selector population with retry mechanism
    setTimeout(() => {
        // Running year selector initialization
        initializeYearSelector();
        initializeTimeFormatToggle();
        
        // Verify they worked
        setTimeout(() => {
            console.log('📊 Component initialization status:');
            console.log('Year options:', yearSelect ? yearSelect.options.length : 'null');
            console.log('Time format toggle:', !!timeFormatToggle);
        }, 100);
    }, 100);
    
    // Add event listeners with null checks
    if (yearSelect) {
        yearSelect.addEventListener('change', handleYearChange);
        console.log('Year select event listener added');
    }
    
    if (timeFormatToggle) {
        timeFormatToggle.addEventListener('click', toggleTimeFormat);
        console.log('Time format toggle event listener added');
    }
    
    // Add priority select color functionality
    if (prioritySelect) {
        // Set initial color based on default selection
        setTimeout(() => {
            updatePrioritySelectColor();
            console.log('🎨 Priority select initial color set');
        }, 150);
        
        prioritySelect.addEventListener('change', updatePrioritySelectColor);
        console.log('🎨 Priority select color functionality added');
    }
    
        // Initialize task context menu system
        initializeTaskContextMenu();
        console.log('🖱️ Task context menu system initialized');
        
        console.log('All components initialized successfully');
    } catch (error) {
        console.error('❌ Error initializing app:', error);
    }
}

// Load when DOM is ready and when window is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);
window.addEventListener('load', function() {
    console.log('🔄 Window fully loaded, ensuring app is initialized');
    // Reinitialize if something failed
    setTimeout(initializeApp, 100);
});

// Task Management Context Menu System
let currentContextTaskIndex = null;
let contextMenu = null;

function initializeTaskContextMenu() {
    contextMenu = document.getElementById('task-context-menu');
    const deleteConfirmation = document.getElementById('delete-confirmation');
    
    // Context menu event handlers
    document.getElementById('edit-task').addEventListener('click', () => editTask(currentContextTaskIndex));
    document.getElementById('reschedule-task').addEventListener('click', () => rescheduleTask(currentContextTaskIndex));
    document.getElementById('duplicate-task').addEventListener('click', () => duplicateTask(currentContextTaskIndex));
    document.getElementById('mark-complete').addEventListener('click', () => markTaskComplete(currentContextTaskIndex));
    document.getElementById('delete-task').addEventListener('click', () => showDeleteConfirmation(currentContextTaskIndex));
    
    // Delete confirmation handlers
    document.getElementById('cancel-delete').addEventListener('click', hideDeleteConfirmation);
    document.getElementById('confirm-delete').addEventListener('click', confirmDeleteTask);
    
    // Edit modal handlers
    document.getElementById('close-edit-modal').addEventListener('click', hideEditModal);
    document.getElementById('cancel-edit').addEventListener('click', hideEditModal);
    document.getElementById('edit-task-form').addEventListener('submit', saveTaskEdit);
    document.getElementById('edit-alarm-toggle').addEventListener('click', toggleEditAlarm);
    
    // Hide context menu on click outside
    document.addEventListener('click', (e) => {
        if (!contextMenu.contains(e.target)) {
            hideContextMenu();
        }
    });
    
    // Prevent context menu from closing when clicking inside it
    contextMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function showTaskContextMenu(event, taskIndex) {
    event.preventDefault();
    event.stopPropagation();
    
    currentContextTaskIndex = taskIndex;
    const task = tasks[taskIndex];
    
    if (!task) return;
    
    // Update menu items based on task status
    const markCompleteItem = document.getElementById('mark-complete');
    if (task.completed) {
        markCompleteItem.innerHTML = '↩️ Mark Incomplete';
        markCompleteItem.setAttribute('data-translate', 'mark_incomplete');
    } else {
        markCompleteItem.innerHTML = '✅ Mark Complete';
        markCompleteItem.setAttribute('data-translate', 'mark_complete');
    }
    
    // Position context menu
    const rect = event.currentTarget.getBoundingClientRect();
    contextMenu.style.display = 'block';
    contextMenu.style.left = `${event.pageX}px`;
    contextMenu.style.top = `${event.pageY}px`;
    
    // Ensure menu stays within viewport
    const menuRect = contextMenu.getBoundingClientRect();
    if (menuRect.right > window.innerWidth) {
        contextMenu.style.left = `${event.pageX - menuRect.width}px`;
    }
    if (menuRect.bottom > window.innerHeight) {
        contextMenu.style.top = `${event.pageY - menuRect.height}px`;
    }
}

function hideContextMenu() {
    if (contextMenu) {
        contextMenu.style.display = 'none';
        currentContextTaskIndex = null;
    }
}

function editTask(taskIndex) {
    hideContextMenu();
    const task = tasks[taskIndex];
    if (!task) return;
    
    // Populate edit modal fields
    document.getElementById('edit-task-title').value = task.text;
    document.getElementById('edit-start-time').value = task.time;
    document.getElementById('edit-end-time').value = task.endTime || '';
    document.getElementById('edit-task-date').value = task.date;
    document.getElementById('edit-task-priority').value = task.priority;
    
    // Set alarm state
    const alarmToggle = document.getElementById('edit-alarm-toggle');
    const alarmText = alarmToggle.querySelector('.alarm-text');
    const alarmInfo = alarmToggle.parentElement.querySelector('.alarm-info');
    
    if (task.alarmEnabled) {
        alarmToggle.setAttribute('data-enabled', 'true');
        alarmText.textContent = 'Alarm On';
        alarmInfo.style.display = 'block';
    } else {
        alarmToggle.setAttribute('data-enabled', 'false');
        alarmText.textContent = 'Alarm Off';
        alarmInfo.style.display = 'none';
    }
    
    // Store the editing task index
    window.editingTaskIndex = taskIndex;
    
    // Show edit modal
    document.getElementById('task-edit-modal').style.display = 'flex';
    
    showNotification('📝 Editing task - make changes and save');
}

function rescheduleTask(taskIndex) {
    hideContextMenu();
    const task = tasks[taskIndex];
    if (!task) return;
    
    // Enable drag-drop mode
    showNotification('📅 Click on a new date/time to reschedule this task');
    
    // Highlight the task for rescheduling
    const taskElements = document.querySelectorAll(`[data-task-index="${taskIndex}"]`);
    taskElements.forEach(el => {
        el.classList.add('rescheduling');
        el.style.border = '2px dashed #ff9800';
        el.style.background = 'rgba(255, 152, 0, 0.1)';
    });
    
    // Store rescheduling task
    window.reschedulingTaskIndex = taskIndex;
    
    // Add click handlers to calendar days and time slots
    addRescheduleHandlers();
}

function addRescheduleHandlers() {
    // Add handlers to calendar days
    document.querySelectorAll('.calendar-day').forEach(day => {
        day.style.cursor = 'pointer';
        day.addEventListener('click', handleRescheduleClick);
    });
    
    // Add handlers to time blocks in timeslot view
    document.querySelectorAll('.time-block').forEach(block => {
        block.style.cursor = 'pointer';
        block.addEventListener('click', handleRescheduleClick);
    });
    
    // Add escape to cancel
    document.addEventListener('keydown', cancelReschedule);
}

function handleRescheduleClick(event) {
    event.stopPropagation();
    
    if (window.reschedulingTaskIndex === null) return;
    
    const task = tasks[window.reschedulingTaskIndex];
    if (!task) return;
    
    let newDate, newTime;
    
    if (event.currentTarget.classList.contains('calendar-day')) {
        // Calendar day clicked
        const day = parseInt(event.currentTarget.textContent);
        if (isNaN(day)) return;
        
        const newDateObj = new Date(currentYear, currentMonth, day);
        newDate = newDateObj.toISOString().split('T')[0];
        newTime = task.time; // Keep original time
    } else if (event.currentTarget.classList.contains('time-block')) {
        // Time block clicked
        const dayIndex = parseInt(event.currentTarget.dataset.dayIndex);
        const timeSlot = event.currentTarget.dataset.time;
        
        if (isNaN(dayIndex) || !timeSlot) return;
        
        const weekStart = getWeekStart(new Date(currentYear, currentMonth, 1));
        const newDateObj = new Date(weekStart);
        newDateObj.setDate(weekStart.getDate() + dayIndex);
        
        newDate = newDateObj.toISOString().split('T')[0];
        newTime = timeSlot;
    }
    
    if (newDate && newTime) {
        // Update task
        task.date = newDate;
        task.time = newTime;
        
        // Save and refresh
        saveTasks();
        updateCalendar();
        displayTasks();
        
        // Clear rescheduling state
        clearRescheduleMode();
        
        showNotification(`✅ Task rescheduled to ${formatDate(new Date(newDate))} at ${newTime}`);
    }
}

function cancelReschedule(event) {
    if (event.key === 'Escape' && window.reschedulingTaskIndex !== null) {
        clearRescheduleMode();
        showNotification('❌ Rescheduling cancelled');
    }
}

function clearRescheduleMode() {
    // Remove rescheduling indicators
    document.querySelectorAll('.rescheduling').forEach(el => {
        el.classList.remove('rescheduling');
        el.style.border = '';
        el.style.background = '';
    });
    
    // Remove handlers
    document.querySelectorAll('.calendar-day, .time-block').forEach(el => {
        el.style.cursor = '';
        el.removeEventListener('click', handleRescheduleClick);
    });
    
    // Remove escape handler
    document.removeEventListener('keydown', cancelReschedule);
    
    // Clear state
    window.reschedulingTaskIndex = null;
}

function duplicateTask(taskIndex) {
    hideContextMenu();
    const task = tasks[taskIndex];
    if (!task) return;
    
    // Create duplicate with modified title
    const duplicateTask = {
        ...task,
        text: `${task.text} (Copy)`,
        id: Date.now() + Math.random() // Ensure unique ID
    };
    
    tasks.push(duplicateTask);
    saveTasks();
    updateCalendar();
    displayTasks();
    
    showNotification('📋 Task duplicated successfully');
}

function markTaskComplete(taskIndex) {
    hideContextMenu();
    const task = tasks[taskIndex];
    if (!task) return;
    
    // Toggle completion status
    task.completed = !task.completed;
    task.completedAt = task.completed ? new Date().toISOString() : null;
    
    saveTasks();
    updateCalendar();
    displayTasks();
    
    const status = task.completed ? 'completed' : 'marked as incomplete';
    showNotification(`✅ Task ${status}`);
}

function showDeleteConfirmation(taskIndex) {
    hideContextMenu();
    const task = tasks[taskIndex];
    if (!task) return;
    
    // Update preview
    document.querySelector('.preview-title').textContent = task.text;
    document.querySelector('.preview-time').textContent = `${formatDate(new Date(task.date))} at ${task.time}`;
    
    // Show modal
    document.getElementById('delete-confirmation').style.display = 'flex';
    
    // Store task index for confirmation
    window.pendingDeleteIndex = taskIndex;
}

function hideDeleteConfirmation() {
    document.getElementById('delete-confirmation').style.display = 'none';
    window.pendingDeleteIndex = null;
}

function confirmDeleteTask() {
    if (window.pendingDeleteIndex === null) return;
    
    const task = tasks[window.pendingDeleteIndex];
    const taskName = task ? task.text : 'Unknown task';
    
    // Remove task
    tasks.splice(window.pendingDeleteIndex, 1);
    saveTasks();
    updateCalendar();
    displayTasks();
    
    hideDeleteConfirmation();
    showNotification(`🗑️ "${taskName}" deleted successfully`);
}

function hideEditModal() {
    document.getElementById('task-edit-modal').style.display = 'none';
    window.editingTaskIndex = null;
}

function toggleEditAlarm() {
    const alarmToggle = document.getElementById('edit-alarm-toggle');
    const alarmText = alarmToggle.querySelector('.alarm-text');
    const alarmInfo = alarmToggle.parentElement.querySelector('.alarm-info');
    const currentState = alarmToggle.getAttribute('data-enabled') === 'true';
    
    if (currentState) {
        alarmToggle.setAttribute('data-enabled', 'false');
        alarmText.textContent = 'Alarm Off';
        alarmInfo.style.display = 'none';
    } else {
        alarmToggle.setAttribute('data-enabled', 'true');
        alarmText.textContent = 'Alarm On';
        alarmInfo.style.display = 'block';
    }
}

function saveTaskEdit(event) {
    event.preventDefault();
    
    if (window.editingTaskIndex === null) return;
    
    const task = tasks[window.editingTaskIndex];
    if (!task) return;
    
    // Get form values
    const title = document.getElementById('edit-task-title').value.trim();
    const startTime = document.getElementById('edit-start-time').value;
    const endTime = document.getElementById('edit-end-time').value;
    const date = document.getElementById('edit-task-date').value;
    const priority = document.getElementById('edit-task-priority').value;
    const alarmEnabled = document.getElementById('edit-alarm-toggle').getAttribute('data-enabled') === 'true';
    
    if (!title || !startTime || !date) {
        showNotification('❌ Please fill in all required fields');
        return;
    }
    
    // Update task
    task.text = title;
    task.time = startTime;
    task.endTime = endTime;
    task.date = date;
    task.priority = priority;
    task.alarmEnabled = alarmEnabled;
    
    if (alarmEnabled) {
        task.alarmTime = startTime;
    }
    
    // Save and refresh
    saveTasks();
    updateCalendar();
    displayTasks();
    
    hideEditModal();
    showNotification(`✅ Task "${title}" updated successfully`);
}

// Add context menu to task list items
function addContextMenuToTasks() {
    // Add to regular task list
    document.querySelectorAll('.task-item').forEach((item, index) => {
        item.addEventListener('contextmenu', (e) => showTaskContextMenu(e, index));
        item.dataset.taskIndex = index;
    });
    
    // Add to timeslot task blocks
    document.querySelectorAll('.task-block').forEach((block) => {
        const taskIndex = parseInt(block.dataset.taskIndex);
        if (!isNaN(taskIndex)) {
            block.addEventListener('contextmenu', (e) => showTaskContextMenu(e, taskIndex));
        }
    });
}

// Setup form handlers
function setupFormHandlers() {
    // Quick form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const taskText = input.value.trim();
        const selectedPriority = prioritySelect.value;
        const startTime = document.getElementById('start-time')?.value || '';
        const endTime = document.getElementById('end-time')?.value || '';
        
        if (taskText === '' || !selectedDate) return;
        
        const baseTask = {
            text: taskText,
            date: selectedDate,
            startTime: startTime,
            endTime: endTime,
            alarmTime: startTime, // Use start time for alarm
            priority: selectedPriority,
            completed: false,
            acknowledged: false,
            createdAt: new Date().toISOString()
        };
        
        // Generate recurring tasks or single task
        const tasksToAdd = generateRecurringTasks(baseTask);
        
        // Add all tasks
        tasksToAdd.forEach(task => addTask(task));
        
        // Show confirmation message
        if (tasksToAdd.length > 1) {
            showNotification(`Successfully added ${tasksToAdd.length} recurring tasks!`);
        }
        
        // Clear form and hide it
        input.value = '';
        document.getElementById('start-time').value = '';
        document.getElementById('end-time').value = '';
        prioritySelect.value = 'medium';
        
        // Reset recurring section
        if (recurringExpanded) {
            document.getElementById('toggle-recurring').click();
        }
        resetRecurringForm();
        
        hideQuickForm();
    });
    
    // Cancel form handler
    if (cancelFormBtn) {
        cancelFormBtn.addEventListener('click', hideQuickForm);
    }
}

// Show quick form for selected date
function showQuickForm(dateString) {
    // Use sidebar instead of old quick form
    showTaskSidebar(dateString);
}

// Alternative function name for consistency
function showTaskForm() {
    if (selectedDate) {
        showQuickForm(selectedDate);
    }
}

// Hide quick form
function hideQuickForm() {
    quickForm.style.display = 'none';
    selectedDate = null;
}

// Notification System Functions
function setupNotificationSystem() {
    // Close sidebar handler
    if (closeNotificationsBtn) {
        closeNotificationsBtn.addEventListener('click', hideSidebar);
    }
    
    // Click outside to close
    document.addEventListener('click', (e) => {
        if (notificationSidebar.classList.contains('show') && 
            !notificationSidebar.contains(e.target) && 
            !e.target.closest('.calendar-day')) {
            hideSidebar();
        }
    });
}

function startNotificationChecker() {
    // Check for active tasks every minute
    notificationCheckInterval = setInterval(checkForActiveNotifications, 60000);
    // Initial check
    checkForActiveNotifications();
}

function checkForActiveNotifications() {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Find tasks that are due now or within the next 15 minutes based on start time
    const activeTasksToday = tasks.filter(task => {
        if (task.completed || !task.startTime || task.acknowledged) return false;
        
        const taskDate = new Date(task.date);
        const isToday = taskDate.toDateString() === now.toDateString();
        
        if (!isToday) return false;
        
        const [taskHour, taskMinute] = task.startTime.split(':').map(Number);
        const taskTime = new Date(now);
        taskTime.setHours(taskHour, taskMinute, 0, 0);
        
        const timeDiff = taskTime.getTime() - now.getTime();
        const minutesDiff = timeDiff / (1000 * 60);
        
        // Show if due now or within next 15 minutes
        return minutesDiff >= -5 && minutesDiff <= 15;
    });
    
    if (activeTasksToday.length > 0) {
        updateNotificationSidebar(activeTasksToday);
        showSidebar();
    } else {
        hideSidebar();
    }
}

function updateNotificationSidebar(activeTasks) {
    activeNotifications.innerHTML = '';
    
    activeTasks.forEach(task => {
        const notificationItem = createNotificationItem(task);
        activeNotifications.appendChild(notificationItem);
    });
}

function createNotificationItem(task) {
    const now = new Date();
    const [taskHour, taskMinute] = task.startTime.split(':').map(Number);
    const taskTime = new Date(now);
    taskTime.setHours(taskHour, taskMinute, 0, 0);
    
    const timeDiff = taskTime.getTime() - now.getTime();
    const minutesDiff = Math.round(timeDiff / (1000 * 60));
    
    let urgencyClass = '';
    let timeText = '';
    
    if (minutesDiff <= 0) {
        urgencyClass = 'urgent';
        timeText = 'Starting now!';
    } else if (minutesDiff <= 5) {
        urgencyClass = 'due-soon';
        timeText = `Starts in ${minutesDiff} minute${minutesDiff !== 1 ? 's' : ''}`;
    } else {
        timeText = `Starts in ${minutesDiff} minutes`;
    }
    
    const timeRange = task.endTime ? 
        `${formatTimeDisplay(task.startTime)} - ${formatTimeDisplay(task.endTime)}` : 
        formatTimeDisplay(task.startTime);
    
    const notificationDiv = document.createElement('div');
    notificationDiv.className = `notification-item ${urgencyClass}`;
    notificationDiv.innerHTML = `
        <div class="notification-task-name">${task.text}</div>
        <div class="notification-time">
            <span>🕐 ${timeRange}</span>
            <span style="margin-left: 10px; font-weight: bold;">${timeText}</span>
        </div>
        <div class="notification-actions">
            <button class="acknowledge-btn" onclick="acknowledgeTask(${task.id})">Acknowledge</button>
            <button class="snooze-btn" onclick="snoozeTask(${task.id})">Snooze 5m</button>
            <button class="complete-btn" onclick="completeTaskFromNotification(${task.id})">Complete</button>
        </div>
    `;
    
    return notificationDiv;
}

function showSidebar() {
    notificationSidebar.classList.add('show');
    mainContent.classList.add('sidebar-open');
}

function hideSidebar() {
    notificationSidebar.classList.remove('show');
    mainContent.classList.remove('sidebar-open');
}

// Task Action Functions
function acknowledgeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        // Mark as acknowledged (prevent future notifications for today)
        task.acknowledged = true;
        saveTasksToLocalStorage();
        checkForActiveNotifications(); // Refresh sidebar
    }
}

function snoozeTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        // Snooze for 5 minutes by updating start time
        const [hours, minutes] = task.startTime.split(':').map(Number);
        const newTime = new Date();
        newTime.setHours(hours, minutes + 5);
        
        task.startTime = newTime.getHours().toString().padStart(2, '0') + ':' + 
                         newTime.getMinutes().toString().padStart(2, '0');
        
        // Also update end time if it exists
        if (task.endTime) {
            const [endHours, endMinutes] = task.endTime.split(':').map(Number);
            const newEndTime = new Date();
            newEndTime.setHours(endHours, endMinutes + 5);
            
            task.endTime = newEndTime.getHours().toString().padStart(2, '0') + ':' + 
                          newEndTime.getMinutes().toString().padStart(2, '0');
        }
        
        // Update alarm time to match new start time
        task.alarmTime = task.startTime;
        
        saveTasksToLocalStorage();
        checkForActiveNotifications(); // Refresh sidebar
        
        // Update alarm timeout
        clearAlarmForTask(taskId);
        setupAlarmForTask(task);
    }
}

function completeTaskFromNotification(taskId) {
    toggleTaskCompletion(taskId);
    checkForActiveNotifications(); // Refresh sidebar
}

// Old form submission handler removed - using new handler above

// Add task
async function addTask(task) {
  // Use localStorage directly for better performance and reliability
  tasks.push(task);
  saveTasksToLocalStorage();
  
  // Refresh calendar and check for notifications
  renderCalendar();
  renderCurrentView(); // Also refresh timeslot view
  setupAlarmForTask(task);
  checkForActiveNotifications();
  
  // Sidebar removed
}

// Load tasks
async function loadTasks() {
  // Use localStorage directly for better performance
  loadTasksFromLocalStorage();
  
  // Remove any existing gym tasks
  removeGymTasks();
  
  // Initialize calendar with loaded tasks
  renderCalendar();
  setupAllAlarms();
  
  // Sidebar removed
}

// Display individual task
function displayTask(task) {
  const li = document.createElement('li');
  li.classList.add('task-item'); // Add task-item class for styling and selection
  li.dataset.taskId = task.id; // Add task ID for bulk operations
  
  // Find task index for context menu
  const taskIndex = tasks.findIndex(t => t.id === task.id);
  li.dataset.taskIndex = taskIndex;
  
  if (task.alarmEnabled) {
    li.classList.add('has-alarm');
  }
  if (task.completed) {
    li.classList.add('completed');
  }
  
  const taskDetails = [];
  
  // Add date
  if (task.date) {
    const taskDate = new Date(task.date);
    const formattedDate = formatTranslatedDate(taskDate, 'shortDate');
    taskDetails.push(`<span class="task-day">📅 ${formattedDate}</span>`);
  }
  
  // Add day of week if specified
  if (task.day) {
    taskDetails.push(`<span class="task-day">${task.day.charAt(0).toUpperCase() + task.day.slice(1)}</span>`);
  }
  
  // Add alarm indicator
  if (task.alarmEnabled) {
    taskDetails.push(`<span class="task-alarm" title="Alarm enabled - will ring 5 minutes before and at scheduled time">🔔 Alarm</span>`);
  }
  
  li.innerHTML = `
    <input type="checkbox" class="task-checkbox" data-task-id="${task.id}">
    <div class="task-content">
      <div style="display: flex; align-items: center;">
        <input type="checkbox" class="completion-checkbox" ${task.completed ? 'checked' : ''} 
               onchange="toggleTaskCompletion(${task.id})" style="margin-right: 10px;">
        <div class="task-priority ${task.priority || 'medium'}"></div>
        <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
      </div>
      <div class="task-details">
        ${taskDetails.join('')}
      </div>
    </div>
    <div class="task-actions">
      <button class="inline-btn edit-btn" onclick="editTask(${taskIndex})" title="Edit task">
        ✏️
      </button>
      <button class="inline-btn complete-btn" onclick="markTaskComplete(${taskIndex})" title="${task.completed ? 'Mark incomplete' : 'Mark complete'}">
        ${task.completed ? '↩️' : '✅'}
      </button>
      <button class="inline-btn reschedule-btn" onclick="rescheduleTask(${taskIndex})" title="Reschedule task">
        📅
      </button>
      <button class="inline-btn delete-btn" onclick="showDeleteConfirmation(${taskIndex})" title="Delete task">
        🗑️
      </button>
      <span class="context-menu-hint" style="font-size: 10px; color: #999; margin-left: 8px;">Right-click for more</span>
    </div>
  `;
  
  if (!list) return;
  list.appendChild(li);
  
  // Add event listener for bulk selection checkbox
  const bulkCheckbox = li.querySelector('.task-checkbox');
  if (bulkCheckbox) {
    bulkCheckbox.addEventListener('change', () => {
      toggleTaskSelection(bulkCheckbox);
      updateBulkActionsVisibility();
    });
  }
}

// Toggle task completion
async function toggleTaskCompletion(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  
  task.completed = !task.completed;
  
  // Save to localStorage
  saveTasksToLocalStorage();
  
  saveTasksToLocalStorage();
  renderCalendar();
  checkForActiveNotifications();
}

// Delete task
async function deleteTask(date, id) {
  // Remove from local array
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  
  // Refresh calendar and notifications
  renderCalendar();
  checkForActiveNotifications();
  
  // Clear any alarms for this task
  clearAlarmForTask(id);
}

// Update day counters
function updateDayCounters() {
  const dayItems = document.querySelectorAll('.day-item');
  
  dayItems.forEach(item => {
    const day = item.dataset.day;
    const count = tasks.filter(task => task.day === day).length;
    const counter = item.querySelector('.task-count');
    counter.textContent = count;
  });
}

// Setup alarm for a single task based on start time - Enhanced precision
function setupAlarmForTask(task) {
  if (!task.startTime || !task.date) return;
  
  const now = new Date();
  const taskDateTime = getTaskDateTimeFromStartTime(task);
  
  if (!taskDateTime) {
    console.warn('⚠️ Invalid task date/time:', task);
    return;
  }
  
  if (taskDateTime > now) {
    const timeUntilAlarm = taskDateTime.getTime() - now.getTime();
    
    // Log alarm scheduling for debugging
    console.log(`⏰ Scheduling alarm for "${task.text}" at ${taskDateTime.toLocaleString()}`);
    console.log(`🕐 Time until alarm: ${Math.round(timeUntilAlarm / 60000)} minutes`);
    
    const timeoutId = setTimeout(() => {
      console.log(`🚨 ALARM TRIGGERED: "${task.text}" at ${new Date().toLocaleString()}`);
      triggerAlarm(task);
    }, timeUntilAlarm);
    
    alarmTimeouts.push({ 
      taskId: task.id, 
      timeoutId,
      scheduledTime: taskDateTime.getTime(),
      taskText: task.text 
    });
  } else {
    console.log(`⏭️ Task "${task.text}" is in the past, skipping alarm`);
  }
}

// Setup all alarms
function setupAllAlarms() {
  // Clear existing timeouts
  alarmTimeouts.forEach(({ timeoutId }) => clearTimeout(timeoutId));
  alarmTimeouts = [];
  
  console.log('🔄 Setting up alarms for all tasks...');
  
  tasks.forEach(task => {
    setupAlarmForTask(task);
  });
  
  console.log(`✅ Set up ${alarmTimeouts.length} alarm(s)`);
  
  // Show scheduled alarms for debugging
  if (alarmTimeouts.length > 0) {
    console.log('📋 Upcoming alarms:');
    alarmTimeouts
      .sort((a, b) => a.scheduledTime - b.scheduledTime)
      .forEach((alarm, index) => {
        const alarmTime = new Date(alarm.scheduledTime);
        console.log(`${index + 1}. "${alarm.taskText}" at ${alarmTime.toLocaleString()}`);
      });
  }
}

// Debug function to show currently scheduled alarms
function showScheduledAlarms() {
  console.log(`🔔 Currently scheduled alarms: ${alarmTimeouts.length}`);
  if (alarmTimeouts.length > 0) {
    alarmTimeouts
      .sort((a, b) => a.scheduledTime - b.scheduledTime)
      .forEach((alarm, index) => {
        const alarmTime = new Date(alarm.scheduledTime);
        const minutesUntil = Math.round((alarm.scheduledTime - Date.now()) / 60000);
        console.log(`${index + 1}. "${alarm.taskText}" in ${minutesUntil} minutes (${alarmTime.toLocaleString()})`);
      });
  } else {
    console.log('📭 No alarms currently scheduled');
  }
}

// Make function available globally for debugging
window.showScheduledAlarms = showScheduledAlarms;

// Get task date and time from start time
function getTaskDateTimeFromStartTime(task) {
  if (!task.startTime || !task.date) return null;
  
  const taskDate = new Date(task.date);
  const [hours, minutes] = task.startTime.split(':');
  taskDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  return taskDate;
}

// Clear alarm for task
function clearAlarmForTask(taskId) {
  const alarmIndex = alarmTimeouts.findIndex(alarm => alarm.taskId === taskId);
  if (alarmIndex !== -1) {
    clearTimeout(alarmTimeouts[alarmIndex].timeoutId);
    alarmTimeouts.splice(alarmIndex, 1);
  }
}

// Enhanced Alarm System with Audio Generation
let alarmContext = null;
let alarmOscillators = [];
let alarmGainNodes = [];
let alarmInterval = null;
let alarmCountdown = 60;

// Create audio context for alarm sound
function initializeAlarmAudio() {
    try {
        // Initialize context but don't start it yet (needs user interaction)
        if (!alarmContext) {
            alarmContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        console.log('🔊 Alarm audio system initialized');
    } catch (e) {
        console.warn('⚠️ Web Audio API not supported:', e);
    }
}

// Resume audio context on user interaction (required by browsers)
function resumeAudioContext() {
    if (alarmContext && alarmContext.state === 'suspended') {
        alarmContext.resume().then(() => {
            console.log('🔊 Audio context resumed');
        });
    }
}

// Add event listeners for user interaction to enable audio
document.addEventListener('click', resumeAudioContext, { once: true });
document.addEventListener('keydown', resumeAudioContext, { once: true });

// Generate gentle alarm sound with gradual volume increase
function playAlarmSound() {
    console.log('🔔 Playing modern pleasant alarm sound');
    
    // Stop any existing alarm
    stopAlarmSound();
    
    // Use the HTML5 audio element for our modern alarm sound
    if (alarmAudio) {
        alarmAudio.currentTime = 0; // Reset to beginning
        alarmAudio.volume = 0.7; // Pleasant volume level
        
        // Play the modern alarm sound
        const playPromise = alarmAudio.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('🎵 Modern alarm sound playing successfully');
                })
                .catch((error) => {
                    console.warn('⚠️ Could not play alarm audio:', error);
                    // Fallback to notification sound if audio fails
                    playNotificationBeep();
                });
        }
        
        // Set alarm timeout to stop after 1 minute
        alarmTimeout = setTimeout(() => {
            stopAlarmSound();
        }, 60000);
    } else {
        console.warn('⚠️ Alarm audio element not found');
        // Fallback to notification beep
        playNotificationBeep();
    }
}

function stopAlarmSound() {
    // Stop HTML5 audio element
    if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
    }
    
    // Clear any alarm timeout
    if (alarmTimeout) {
        clearTimeout(alarmTimeout);
        alarmTimeout = null;
    }
    
    // Stop any Web Audio API oscillators (for backwards compatibility)
    if (alarmOscillators) {
        alarmOscillators.forEach(oscillator => {
            if (oscillator) {
                try {
                    oscillator.stop();
                } catch (e) {
                    // Oscillator already stopped
                }
            }
        });
        alarmOscillators = [];
    }
    
    if (alarmGainNodes) {
        alarmGainNodes = [];
    }
    
    console.log('🔕 Stopped modern alarm sound');
}

// Fallback notification beep using Web Audio API
function playNotificationBeep() {
    try {
        if (!alarmContext) {
            alarmContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = alarmContext.createOscillator();
        const gainNode = alarmContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(alarmContext.destination);
        
        // Create a pleasant notification beep
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, alarmContext.currentTime);
        
        // Quick fade in and out
        gainNode.gain.setValueAtTime(0, alarmContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, alarmContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, alarmContext.currentTime + 0.5);
        
        oscillator.start(alarmContext.currentTime);
        oscillator.stop(alarmContext.currentTime + 0.5);
        
        console.log('🔔 Playing fallback notification beep');
    } catch (e) {
        console.warn('⚠️ Could not play notification beep:', e);
    }
}

// Start monitoring tasks for alarms (5 minutes before and at scheduled time)
function startAlarmMonitoring() {
    console.log('🔔 Starting alarm monitoring system');
    
    // Check every minute for upcoming alarms
    setInterval(checkForUpcomingAlarms, 60000);
    
    // Also check immediately
    checkForUpcomingAlarms();
}

// Check all tasks for upcoming alarms
function checkForUpcomingAlarms() {
    const now = new Date();
    const currentTimeString = now.toTimeString().substring(0, 5); // HH:MM format
    const todayDateString = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    
    console.log(`⏰ Checking alarms at ${currentTimeString} on ${todayDateString}`);
    
    // Get today's tasks
    const todayTasks = tasks.filter(task => 
        task.date === todayDateString && 
        task.alarmEnabled === true && 
        task.startTime && 
        !task.completed &&
        !task.alarmTriggered && // Don't trigger the same alarm twice
        !task.fiveMinuteWarningTriggered // Track 5-minute warnings separately
    );
    
    todayTasks.forEach(task => {
        const taskTime = task.startTime; // HH:MM format
        const [taskHour, taskMinute] = taskTime.split(':').map(Number);
        const taskDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), taskHour, taskMinute);
        const timeDiff = taskDate - now; // Difference in milliseconds
        const minutesUntil = Math.floor(timeDiff / (1000 * 60));
        
        // Trigger 5-minute warning
        if (minutesUntil === 5 && !task.fiveMinuteWarningTriggered) {
            console.log(`🔔 5-minute warning for task: ${task.text}`);
            triggerAlarm(task, '5-minute-warning');
            task.fiveMinuteWarningTriggered = true;
            saveTasksToLocalStorage(); // Save the state
        }
        
        // Trigger exact time alarm
        if (minutesUntil === 0 && !task.alarmTriggered) {
            console.log(`🔔 Exact time alarm for task: ${task.text}`);
            triggerAlarm(task, 'exact-time');
            task.alarmTriggered = true;
            saveTasksToLocalStorage(); // Save the state
        }
    });
}

// Trigger an alarm for a specific task
function triggerAlarm(task, type) {
    const isWarning = type === '5-minute-warning';
    const title = isWarning ? 
        `⚠️ Reminder: Task in 5 minutes` : 
        `🔔 Task Time: ${task.startTime}`;
    
    const message = isWarning ? 
        `"${task.text}" is scheduled to start at ${task.startTime}` : 
        `Time for: "${task.text}"`;
    
    // Play the alarm sound
    playAlarmSound();
    
    // Show browser notification if permissions granted
    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: message,
            icon: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔔</text></svg>',
            requireInteraction: true
        });
        
        // Auto-close notification after 10 seconds for warnings, 30 seconds for exact time
        setTimeout(() => {
            notification.close();
        }, isWarning ? 10000 : 30000);
    }
    
    // Show in-app notification
    showNotification(`${title}: ${message}`);
    
    console.log(`🔔 Alarm triggered for task "${task.text}" at ${task.startTime} (${type})`);
}

// Update recurring preview and submit button
function updateRecurringPreview() {
    const recurringOptions = document.getElementById('sidebar-recurring-options');
    const preview = document.getElementById('recurring-preview');
    const previewContent = document.getElementById('preview-content');
    
    if (!recurringOptions || recurringOptions.style.display === 'none') {
        if (preview) preview.style.display = 'none';
        updateSubmitButtonText();
        return;
    }
    
    const recurringType = document.getElementById('sidebar-recurring-type')?.value;
    const recurringCount = parseInt(document.getElementById('sidebar-recurring-count')?.value) || 3;
    const taskTitle = document.getElementById('sidebar-task-title')?.value || 'Task';
    const startTime = document.getElementById('sidebar-start-time')?.value || '09:00';
    
    if (recurringType === 'none') {
        preview.style.display = 'none';
        updateSubmitButtonText();
        return;
    }
    
    // Calculate preview tasks
    let previewTasks = [];
    const baseDate = new Date(selectedSidebarDate || new Date());
    
    try {
        // Create a mock base task for preview
        const mockBaseTask = {
            text: taskTitle,
            date: baseDate.toISOString().split('T')[0],
            startTime: startTime
        };
        
        // Generate preview using the same logic as the actual generation
        const previewList = generateRecurringPreview(mockBaseTask, recurringType, recurringCount);
        
        if (previewList.length > 0) {
            let previewHTML = `<div class="preview-summary">
                <strong>Will create ${previewList.length} tasks:</strong>
            </div>
            <ul class="preview-task-list">`;
            
            previewList.slice(0, 5).forEach((task, index) => { // Show first 5 tasks
                const taskDate = new Date(task.date);
                const dateStr = taskDate.toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    weekday: 'short'
                });
                previewHTML += `
                    <li class="preview-task-item">
                        <span>${dateStr}: ${task.text}</span>
                        <span>${task.startTime}</span>
                    </li>`;
            });
            
            if (previewList.length > 5) {
                previewHTML += `<li class="preview-task-item">
                    <span><em>... and ${previewList.length - 5} more</em></span>
                </li>`;
            }
            
            previewHTML += '</ul>';
            
            previewContent.innerHTML = previewHTML;
            preview.style.display = 'block';
            
            updateSubmitButtonText(previewList.length);
        }
    } catch (error) {
        console.warn('Preview generation error:', error);
        preview.style.display = 'none';
        updateSubmitButtonText();
    }
}

// Generate recurring preview (simplified version of the main generation)
function generateRecurringPreview(baseTask, recurringType, count) {
    const tasks = [];
    const baseDate = new Date(baseTask.date);
    
    switch (recurringType) {
        case 'daily':
            for (let i = 0; i < Math.min(count, 10); i++) { // Limit preview to 10
                const taskDate = new Date(baseDate);
                taskDate.setDate(baseDate.getDate() + i);
                tasks.push({
                    ...baseTask,
                    date: taskDate.toISOString().split('T')[0]
                });
            }
            break;
            
        case 'weekly':
            const selectedDays = getSidebarSelectedWeekdays();
            if (selectedDays.length === 0) selectedDays.push(baseDate.getDay());
            
            let weekCount = 0;
            while (tasks.length < Math.min(count, 10)) {
                selectedDays.forEach(dayOfWeek => {
                    if (tasks.length >= count) return;
                    const taskDate = new Date(baseDate);
                    const dayDiff = (dayOfWeek - baseDate.getDay() + 7) % 7;
                    taskDate.setDate(baseDate.getDate() + dayDiff + (weekCount * 7));
                    tasks.push({
                        ...baseTask,
                        date: taskDate.toISOString().split('T')[0]
                    });
                });
                weekCount++;
            }
            break;
            
        case 'monthly':
            for (let i = 0; i < Math.min(count, 10); i++) {
                const taskDate = new Date(baseDate);
                taskDate.setMonth(baseDate.getMonth() + i);
                tasks.push({
                    ...baseTask,
                    date: taskDate.toISOString().split('T')[0]
                });
            }
            break;
    }
    
    return tasks;
}

// Update submit button text to show task count
function updateSubmitButtonText(taskCount = 1) {
    const submitText = document.getElementById('sidebar-submit-text');
    if (!submitText) return;
    
    if (taskCount === 1) {
        submitText.textContent = translate('add_task');
    } else {
        submitText.textContent = `Add ${taskCount} Tasks`;
    }
}

// Trigger alarm with full UI
function triggerAlarm(task) {
    console.log('🚨 Triggering alarm for task:', task.text);
    
    // Initialize countdown
    alarmCountdown = 60;
    
    // Play alarm sound (with fallback)
    playAlarmSoundWithFallback();
    
    // Show alarm modal
    showAlarmModal(task);
    
    // Start countdown
    startAlarmCountdown();
    
    // Remove this alarm from timeouts
    clearAlarmForTask(task.id);
}

// Enhanced alarm sound with fallback - Updated for 1-minute duration
function playAlarmSoundWithFallback() {
    console.log('🔔 Attempting to play alarm sound for exactly 1 minute...');
    
    // Stop any existing alarms first
    stopAlarmSound();
    
    // Try Web Audio API first
    if (alarmContext && alarmContext.state === 'running') {
        playAlarmSound();
        console.log('✅ Using Web Audio API for alarm (1 minute)');
        return;
    }
    
    // Fallback: Create a simple beep sound for 1 minute
    try {
        playFallbackAlarm();
        console.log('✅ Using fallback alarm sound (1 minute)');
    } catch (error) {
        console.error('❌ Failed to play alarm sound:', error);
        // Final fallback: Browser notification sound
        showBrowserNotification();
    }
}

// Fallback alarm using oscillator - Enhanced for exactly 1 minute duration
function playFallbackAlarm() {
    if (!alarmContext) {
        // Try to initialize context if not already done
        try {
            alarmContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            throw new Error('Web Audio API not available');
        }
    }
    
    // Resume context if suspended
    if (alarmContext.state === 'suspended') {
        alarmContext.resume();
    }
    
    // Clear any existing alarm oscillators
    stopAlarmSound();
    
    // Create a simple beep pattern - more frequent for better alarm effect
    const beepPattern = [
        { freq: 880, duration: 0.15, pause: 0.15 }, // A5 note
        { freq: 1108, duration: 0.15, pause: 0.15 }, // C#6 note  
        { freq: 880, duration: 0.15, pause: 0.7 }   // A5 note with longer pause
    ];
    
    let currentTime = alarmContext.currentTime;
    const alarmDuration = 60; // Exactly 1 minute
    const patternDuration = beepPattern.reduce((sum, beep) => sum + beep.duration + beep.pause, 0);
    const repetitions = Math.ceil(alarmDuration / patternDuration);
    
    console.log(`🔔 Playing alarm pattern ${repetitions} times for ${alarmDuration} seconds`);
    
    // Play beep pattern to fill exactly 60 seconds
    for (let repeat = 0; repeat < repetitions; repeat++) {
        const remainingTime = alarmDuration - (repeat * patternDuration);
        if (remainingTime <= 0) break;
        
        beepPattern.forEach(beep => {
            if (currentTime - alarmContext.currentTime >= alarmDuration) return;
            
            const oscillator = alarmContext.createOscillator();
            const gainNode = alarmContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(alarmContext.destination);
            
            oscillator.frequency.setValueAtTime(beep.freq, currentTime);
            oscillator.type = 'sine';
            
            // Smooth volume envelope
            gainNode.gain.setValueAtTime(0, currentTime);
            gainNode.gain.linearRampToValueAtTime(0.15, currentTime + 0.02);
            gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + beep.duration);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + beep.duration);
            
            // Store references for cleanup
            alarmOscillators.push(oscillator);
            alarmGainNodes.push(gainNode);
            
            currentTime += beep.duration + beep.pause;
        });
    }
    
    // Set master timeout to stop after exactly 60 seconds
    setTimeout(() => {
        console.log('⏰ 1-minute alarm duration completed');
        if (alarmInterval) {
            dismissAlarm();
        }
    }, 60000);
}

// Browser notification as final fallback
function showBrowserNotification() {
    // Check if notifications are supported and permitted
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            new Notification('Task Reminder', {
                body: 'You have a task due now!',
                icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🔔</text></svg>',
                tag: 'task-alarm'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    showBrowserNotification();
                }
            });
        }
    }
    
    console.log('📱 Browser notification shown as alarm fallback');
}

// Show alarm modal with task details - Enhanced with precise timing
function showAlarmModal(task) {
    const overlay = document.getElementById('alarm-overlay');
    const taskInfo = document.getElementById('alarm-task-info');
    const countdown = document.getElementById('alarm-countdown');
    
    if (!overlay || !taskInfo) return;
    
    const timeRange = task.endTime ? 
        `${formatTimeDisplay(task.startTime)} - ${formatTimeDisplay(task.endTime)}` : 
        formatTimeDisplay(task.startTime);
    
    // Get current time for display
    const now = new Date();
    const currentTime = now.toLocaleTimeString('en-US', { 
        hour12: true, 
        hour: 'numeric', 
        minute: '2-digit' 
    });
    
    // Populate task information with enhanced details
    taskInfo.innerHTML = `
        <div class="task-priority ${task.priority}">
            <strong>🔔 ${task.text}</strong>
        </div>
        <div class="task-details">
            📅 ${formatTranslatedDate(new Date(task.date), 'shortDate')}
            ⏰ Scheduled: ${timeRange}
            🕐 Triggered: ${currentTime}
        </div>
        <div class="alarm-subtitle">
            ⏱️ Alarm will stop automatically in <span id="alarm-countdown">60</span> seconds
        </div>
    `;
    
    // Show overlay with enhanced animation
    overlay.style.display = 'flex';
    overlay.style.animation = 'alarmPulse 0.5s ease-out';
    
    // Auto-dismiss after exactly 60 seconds
    setTimeout(() => {
        if (overlay.style.display === 'flex') {
            console.log('⏰ Auto-dismissing alarm after 60 seconds');
            dismissAlarm();
        }
    }, 60000);
}

// Start countdown timer
function startAlarmCountdown() {
    const countdown = document.getElementById('alarm-countdown');
    
    alarmInterval = setInterval(() => {
        alarmCountdown--;
        if (countdown) {
            countdown.textContent = alarmCountdown;
        }
        
        if (alarmCountdown <= 0) {
            dismissAlarm();
        }
    }, 1000);
}

// Dismiss alarm
function dismissAlarm() {
    // Stop sound
    stopAlarmSound();
    
    // Clear countdown
    if (alarmInterval) {
        clearInterval(alarmInterval);
        alarmInterval = null;
    }
    
    // Hide modal
    const overlay = document.getElementById('alarm-overlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
    
    console.log('✅ Alarm dismissed');
}

// Snooze alarm for 5 minutes
function snoozeAlarm() {
    // Get current task from alarm modal
    const taskInfo = document.getElementById('alarm-task-info');
    if (!taskInfo) return;
    
    // Dismiss current alarm
    dismissAlarm();
    
    // Find the task and reschedule for 5 minutes later
    // This would require storing the current task reference
    console.log('😴 Alarm snoozed for 5 minutes');
}

// Setup alarm UI event handlers
function setupAlarmHandlers() {
    const dismissBtn = document.getElementById('dismiss-alarm');
    const snoozeBtn = document.getElementById('snooze-alarm');
    
    if (dismissBtn) {
        dismissBtn.addEventListener('click', dismissAlarm);
    }
    
    if (snoozeBtn) {
        snoozeBtn.addEventListener('click', snoozeAlarm);
    }
    
    // Also allow ESC key to dismiss alarm
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const overlay = document.getElementById('alarm-overlay');
            if (overlay && overlay.style.display === 'flex') {
                dismissAlarm();
            }
        }
    });
    
    console.log('🚨 Alarm handlers initialized');
}

// Test alarm function for immediate testing (available in console)
function testAlarm() {
    console.log('🧪 Testing alarm system...');
    
    // Create a test task
    const testTask = {
        id: 'test-' + Date.now(),
        text: '🧪 Test Alarm - Gym Workout',
        startTime: new Date().toTimeString().slice(0, 5), // Current time
        date: new Date().toISOString().split('T')[0], // Today
        priority: 'high'
    };
    
    // Trigger the alarm immediately
    triggerAlarm(testTask);
    
    console.log('✅ Test alarm triggered! It should ring for exactly 1 minute.');
    console.log('💡 You can dismiss it manually or wait for auto-dismissal.');
}

// Make test function available globally
window.testAlarm = testAlarm;

// Debug function to check alarm system status
function debugAlarmSystem() {
    console.log('🔍 ALARM SYSTEM DEBUG:');
    console.log('1. Global tasks array:', typeof tasks !== 'undefined' ? tasks.length : 'undefined');
    console.log('2. LocalStorage tasks:', JSON.parse(localStorage.getItem('tasks') || '[]').length);
    console.log('3. Scheduled alarms:', alarmTimeouts.length);
    console.log('4. Audio context:', alarmContext ? alarmContext.state : 'not initialized');
    console.log('5. Alarm audio element:', !!alarmAudio);
    
    if (alarmTimeouts.length > 0) {
        console.log('📋 Scheduled alarms:');
        alarmTimeouts.forEach((alarm, i) => {
            const time = new Date(alarm.scheduledTime);
            const minutesUntil = Math.round((alarm.scheduledTime - Date.now()) / 60000);
            console.log(`${i+1}. "${alarm.taskText}" at ${time.toLocaleString()} (${minutesUntil} min)`);
        });
    }
}

// Make debug function available globally
window.debugAlarmSystem = debugAlarmSystem;

// Enhanced Recurring Task System
function initializeEnhancedRecurring() {
    const recurringType = document.getElementById('sidebar-recurring-type');
    const recurringDuration = document.getElementById('recurring-duration');
    const durationType = document.getElementById('sidebar-duration-type');
    const untilDateGroup = document.getElementById('until-date-group');
    const weeklyOptions = document.getElementById('sidebar-weekly-options');
    const dailyOptions = document.getElementById('sidebar-daily-options');
    const monthlyOptions = document.getElementById('sidebar-monthly-options');
    const customOptions = document.getElementById('sidebar-custom-options');
    
    if (!recurringType) return;
    
    // Handle recurring type changes
    recurringType.addEventListener('change', (e) => {
        const selectedType = e.target.value;
        
        // Show/hide duration options
        if (selectedType !== 'none') {
            recurringDuration.style.display = 'block';
        } else {
            recurringDuration.style.display = 'none';
        }
        
        // Hide all specific options first
        if (weeklyOptions) weeklyOptions.style.display = 'none';
        if (dailyOptions) dailyOptions.style.display = 'none';
        if (monthlyOptions) monthlyOptions.style.display = 'none';
        if (customOptions) customOptions.style.display = 'none';
        
        // Show relevant options based on type
        switch (selectedType) {
            case 'daily':
                if (dailyOptions) dailyOptions.style.display = 'block';
                break;
            case 'weekly':
                if (weeklyOptions) weeklyOptions.style.display = 'block';
                break;
            case 'monthly':
                if (monthlyOptions) monthlyOptions.style.display = 'block';
                break;
            case 'custom':
                if (customOptions) customOptions.style.display = 'block';
                break;
        }
    });
    
    // Handle duration type changes
    if (durationType && untilDateGroup) {
        durationType.addEventListener('change', (e) => {
            const showDatePicker = e.target.value === 'until';
            untilDateGroup.style.display = showDatePicker ? 'block' : 'none';
            
            if (showDatePicker) {
                // Set default date to 1 month from now
                const defaultDate = new Date();
                defaultDate.setMonth(defaultDate.getMonth() + 1);
                const untilDateInput = document.getElementById('sidebar-until-date');
                if (untilDateInput && !untilDateInput.value) {
                    untilDateInput.value = defaultDate.toISOString().split('T')[0];
                }
            }
        });
    }
    
    // Handle preset buttons
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const preset = e.target.dataset.preset;
            applySidebarRecurringPreset(preset);
        });
    });
    
    console.log('✅ Enhanced recurring system initialized');
}

// Apply recurring presets with enhanced options
function applySidebarRecurringPreset(preset) {
    const recurringType = document.getElementById('sidebar-recurring-type');
    const recurringCount = document.getElementById('sidebar-recurring-count');
    const durationType = document.getElementById('sidebar-duration-type');
    const weeklyOptions = document.getElementById('sidebar-weekly-options');
    const dailyInterval = document.getElementById('sidebar-daily-interval');
    const dailyType = document.getElementById('sidebar-daily-type');
    
    if (!recurringType) return;
    
    // Clear all weekday selections first
    const weekdayCheckboxes = weeklyOptions?.querySelectorAll('input[type="checkbox"]');
    if (weekdayCheckboxes) {
        weekdayCheckboxes.forEach(cb => cb.checked = false);
    }
    
    switch (preset) {
        case 'work-week':
            recurringType.value = 'weekly';
            recurringCount.value = '52';
            durationType.value = 'count';
            // Select Monday through Friday (1-5)
            [1, 2, 3, 4, 5].forEach(day => {
                const checkbox = weeklyOptions?.querySelector(`input[value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
            break;
            
        case 'weekends':
            recurringType.value = 'weekly';
            recurringCount.value = '26';
            durationType.value = 'count';
            // Select Saturday and Sunday (6, 0)
            [0, 6].forEach(day => {
                const checkbox = weeklyOptions?.querySelector(`input[value="${day}"]`);
                if (checkbox) checkbox.checked = true;
            });
            break;
            
        case 'daily-month':
            recurringType.value = 'daily';
            recurringCount.value = '30';
            durationType.value = 'count';
            if (dailyInterval) dailyInterval.value = '1';
            if (dailyType) dailyType.value = 'day';
            break;
            
        case 'weekly-year':
            recurringType.value = 'weekly';
            recurringCount.value = '52';
            durationType.value = 'count';
            // Select current day of week
            const today = new Date().getDay();
            const todayCheckbox = weeklyOptions?.querySelector(`input[value="${today}"]`);
            if (todayCheckbox) todayCheckbox.checked = true;
            break;
            
        case 'bi-weekly':
            recurringType.value = 'weekly';
            recurringCount.value = '26';
            durationType.value = 'count';
            // Select current day of week for bi-weekly
            const currentDay = new Date().getDay();
            const currentDayCheckbox = weeklyOptions?.querySelector(`input[value="${currentDay}"]`);
            if (currentDayCheckbox) currentDayCheckbox.checked = true;
            break;
    }
    
    // Trigger the change event to update the UI
    recurringType.dispatchEvent(new Event('change'));
    durationType.dispatchEvent(new Event('change'));
    
    console.log(`📅 Applied preset: ${preset}`);
}

// Show alarm notification
function showAlarmNotification(task) {
  const notification = document.createElement('div');
  notification.className = 'alarm-notification';
  notification.innerHTML = `
    <strong>Task Reminder!</strong><br>
    ${task.text}
    <button onclick="this.parentElement.remove()" style="margin-left: 10px; background: none; border: 1px solid white; color: white; padding: 2px 6px; border-radius: 3px; cursor: pointer;">×</button>
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 10000);
}

// Check for alarms (fallback)
function checkAlarms() {
  const now = new Date();
  const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  const currentDay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][now.getDay()];
  
  tasks.forEach(task => {
    if (task.day === currentDay && task.alarmTime === currentTime && !task.alarmTriggered) {
      task.alarmTriggered = true;
      triggerAlarm(task);
    }
  });
}

// Calendar functionality
function setupCalendar() {
  renderCalendar();
  const prevMonthOnly = document.getElementById('prev-month');
  const nextMonthOnly = document.getElementById('next-month');
  if (prevMonthOnly) {
    prevMonthOnly.addEventListener('click', () => {
      console.log('📅 Previous month clicked');
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
      renderCalendar();
      updatePeriodDisplay();
    });
  }
  if (nextMonthOnly) {
    nextMonthOnly.addEventListener('click', () => {
      console.log('📅 Next month clicked');
      currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
      renderCalendar();
      updatePeriodDisplay();
    });
  }
}

function renderCalendar() {
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  
  // Update month display using translation system
  console.log(`🗓️ renderCalendar: Rendering ${year}-${month} in language ${currentLanguage}`);
  
  if (currentMonthDisplay) {
        const monthKey = `month_${month}`;
        const monthName = translations[currentLanguage][monthKey] || translations['en'][monthKey];
        const displayText = `${monthName} ${year}`;
        currentMonthDisplay.textContent = displayText;
        console.log(`📅 renderCalendar updated currentMonthDisplay (${currentMonthDisplay.id}): "${displayText}"`);
    } else {
        console.warn('⚠️ currentMonthDisplay element not found in renderCalendar');
    }
    
    // Also update the period display to ensure consistency
    updatePeriodDisplay();
  
  // Get first day of month and number of days
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();
  
  // Clear calendar
    if (!calendarDays) return;
    calendarDays.innerHTML = '';
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    const prevMonthDay = new Date(year, month, -startingDayOfWeek + i + 1);
    const dayElement = createCalendarDay(prevMonthDay, true);
    calendarDays.appendChild(dayElement);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayElement = createCalendarDay(date, false);
    calendarDays.appendChild(dayElement);
  }
  
  // Add days from next month to fill the grid
  const totalCells = calendarDays.children.length;
  const remainingCells = 42 - totalCells; // 6 rows × 7 days
  for (let day = 1; day <= remainingCells && remainingCells < 14; day++) {
    const nextMonthDay = new Date(year, month + 1, day);
    const dayElement = createCalendarDay(nextMonthDay, true);
    calendarDays.appendChild(dayElement);
  }
}

function createCalendarDay(date, otherMonth) {
  const dayElement = document.createElement('div');
  dayElement.className = 'calendar-day';
    dayElement.textContent = date.getDate();
    // Attach data-date for later lookups/highlighting
    dayElement.dataset.date = date.toISOString().split('T')[0];
  
  if (otherMonth) {
    dayElement.classList.add('other-month');
  }
  
  // Check if it's today
  const today = new Date();
  if (date.toDateString() === today.toDateString()) {
    dayElement.classList.add('today');
  }
  
  // Check if this date has tasks
  const dateString = date.toISOString().split('T')[0];
  const dayTasks = tasks.filter(task => task.date === dateString);
  
  if (dayTasks.length > 0) {
    dayElement.classList.add('has-tasks');
    
    // Add priority indicator and background color for highest priority task
    const highestPriority = getHighestPriority(dayTasks);
    const indicator = document.createElement('div');
    indicator.className = `task-indicator ${highestPriority}`;
    dayElement.appendChild(indicator);
    
    // Add priority background color to the day
    dayElement.classList.add(`priority-${highestPriority}`);
  }
  
  // Add click handler
  dayElement.addEventListener('click', () => {
    // Remove previous selection
    document.querySelectorAll('.calendar-day.selected').forEach(el => {
      el.classList.remove('selected');
    });
    
    // Add selection to clicked day
    dayElement.classList.add('selected');
    
    // Show quick form for adding tasks to this date
    showQuickForm(dateString);
  });
  
  return dayElement;
}

function getHighestPriority(tasks) {
  const priorities = ['high', 'medium', 'low'];
  for (const priority of priorities) {
    if (tasks.some(task => task.priority === priority)) {
      return priority;
    }
  }
  return 'low';
}

// Filter functionality
function setupFilters() {
  // Get filter buttons if they exist
  const filterBtns = document.querySelectorAll('.filter-btn');
  
  if (filterBtns.length === 0) {
    console.log('ℹ️ No filter buttons found, skipping filter setup');
    return;
  }
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active filter button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Apply filter
      const filter = btn.dataset.filter;
      applyFilter(filter);
    });
  });
}

// Setup day items function - placeholder for future day selection functionality
function setupDayItems() {
    // This function can be extended in the future to handle day-specific UI elements
    console.log('📅 Day items setup complete');
}

function applyFilter(filter) {
  currentFilter = filter;
  
  switch (filter) {
    case 'today':
      filterTasksByDate(new Date().toISOString().split('T')[0]);
      break;
    case 'week':
      filterTasksByWeek();
      break;
    case 'month':
      filterTasksByMonth();
      break;
    default:
      filterTasksByDay('');
      break;
  }
}

function filterTasksByDate(dateString) {
  currentFilter = 'date';
  selectedDate = dateString;
  const date = new Date(dateString);
  const currentDayTitle = document.getElementById('current-day-title');
  if (currentDayTitle) currentDayTitle.textContent = `${translate('tasks_for')} ${formatTranslatedDate(date, 'full')}`;
  displayTasks();
}

function filterTasksByWeek() {
  currentFilter = 'week';
  const currentDayTitle = document.getElementById('current-day-title');
  if (currentDayTitle) currentDayTitle.textContent = 'This Week\'s Tasks';
  displayTasks();
}

function filterTasksByMonth() {
  currentFilter = 'month';
  const monthName = formatTranslatedDate(new Date(), 'monthYear');
  const currentDayTitle = document.getElementById('current-day-title');
  if (currentDayTitle) currentDayTitle.textContent = `${monthName} ${translate('tasks')}`;
  displayTasks();
}

// Enhanced display tasks function
function displayTasks() {
  if (!list) return;
  list.innerHTML = '';
  
  let filteredTasks = [...tasks];
  
  // Apply current filter
  if (currentFilter === 'date' && selectedDate) {
    filteredTasks = tasks.filter(task => task.date === selectedDate);
  } else if (currentFilter === 'today') {
    const today = new Date().toISOString().split('T')[0];
    filteredTasks = tasks.filter(task => task.date === today);
  } else if (currentFilter === 'week') {
    const now = new Date();
    const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
    const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));
    filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate >= weekStart && taskDate <= weekEnd;
    });
  } else if (currentFilter === 'month') {
    const now = new Date();
    filteredTasks = tasks.filter(task => {
      const taskDate = new Date(task.date);
      return taskDate.getMonth() === now.getMonth() && 
             taskDate.getFullYear() === now.getFullYear();
    });
  } else if (currentFilter && currentFilter !== 'all') {
    // Legacy day filter
    filteredTasks = tasks.filter(task => task.day === currentFilter);
  }
  
  // Sort by date, then by priority, then by time
  filteredTasks.sort((a, b) => {
    // First by date
    if (a.date !== b.date) {
      return new Date(a.date) - new Date(b.date);
    }
    
    // Then by priority
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    if (a.priority !== b.priority) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    
    // Finally by alarm time
    if (a.alarmTime && b.alarmTime) {
      return a.alarmTime.localeCompare(b.alarmTime);
    }
    
    return 0;
  });
  
  filteredTasks.forEach(task => {
    displayTask(task);
  });
  
  // Add context menu support to newly rendered tasks
  setTimeout(() => {
    addContextMenuToTasks();
  }, 50);
  
  // Update calendar after task changes
  renderCalendar();
  updateDayCounters();
}

// Local storage functions
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('taskTrackerTasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks).map(task => ({
      ...task,
      date: task.date || new Date().toISOString().split('T')[0],
      priority: task.priority || 'medium',
      fullDate: task.fullDate ? new Date(task.fullDate) : new Date()
    }));
  }
}

function saveTasksToLocalStorage() {
  localStorage.setItem('taskTrackerTasks', JSON.stringify(tasks));
}

// Function to remove gym tasks specifically
function removeGymTasks() {
  const originalLength = tasks.length;
  tasks = tasks.filter(task => task && task.title && !task.title.toLowerCase().includes('gym'));
  
  const removedCount = originalLength - tasks.length;
  if (removedCount > 0) {
    saveTasksToLocalStorage();
    renderCalendar();
    displayTasks();
    updateDashboard();
    console.log(`Removed ${removedCount} gym task(s)`);
    
    // Show notification to user
    if (typeof showNotification === 'function') {
      showNotification(`Removed ${removedCount} gym task(s)`, 'success');
    }
  } else {
    console.log('No gym tasks found to remove');
  }
  
  return removedCount;
}

// Make removeGymTasks available globally for console use
window.removeGymTasks = removeGymTasks;

function updateDashboard() {
    updateDashboardStats();
    renderUpcomingTasks();
    updateProgressRing();
}

function updateDashboardStats() {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.date === today);
    const completedToday = todayTasks.filter(task => task.completed).length;
    
    const thisWeek = getWeekTasks();
    const highPriorityTasks = tasks.filter(task => task.priority === 'high' && !task.completed);
    
    const todayCountEl = document.getElementById('today-count');
    const weekCountEl = document.getElementById('week-count');
    const highPriorityCountEl = document.getElementById('high-priority-count');
    const totalCountEl = document.getElementById('total-count');
    
    if (todayCountEl) todayCountEl.textContent = completedToday + '/' + todayTasks.length;
    if (weekCountEl) weekCountEl.textContent = thisWeek.length;
    if (highPriorityCountEl) highPriorityCountEl.textContent = highPriorityTasks.length;
    if (totalCountEl) totalCountEl.textContent = tasks.length;
}

function getWeekTasks() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return tasks.filter(task => {
        const taskDate = new Date(task.date);
        return taskDate >= weekStart && taskDate <= weekEnd;
    });
}

function renderUpcomingTasks() {
    const upcomingContainer = document.querySelector('.upcoming-tasks');
    if (!upcomingContainer) return;
    
    const today = new Date();
    const upcoming = tasks
        .filter(task => !task.completed && new Date(task.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);
    
    if (upcoming.length === 0) {
        upcomingContainer.innerHTML = '<p style="opacity: 0.6; font-size: 14px;">No upcoming tasks</p>';
        return;
    }
    
    upcomingContainer.innerHTML = upcoming.map(task => `
        <div class="upcoming-task" onclick="selectTaskDate('${task.date}')">
            <div class="task-name">${task.text}</div>
            <div class="task-due">${formatDateForDisplay(new Date(task.date))}</div>
        </div>
    `).join('');
}

function selectTaskDate(dateString) {
    // Select the date in calendar and filter tasks
    selectedDate = dateString;
  const taskDateInput = document.getElementById('task-date');
  if (taskDateInput) taskDateInput.value = dateString;
    filterTasksByDate(dateString);
    
    // Update calendar display if needed
    const targetDate = new Date(dateString);
    if (targetDate.getMonth() !== currentCalendarDate.getMonth() || 
        targetDate.getFullYear() !== currentCalendarDate.getFullYear()) {
        currentCalendarDate = new Date(targetDate);
        renderCalendar();
    }
}

function updateProgressRing() {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = tasks.filter(task => task.date === today);
    const completedToday = todayTasks.filter(task => task.completed).length;
    const percentage = todayTasks.length > 0 ? (completedToday / todayTasks.length) * 100 : 0;
    
    const progressRing = document.querySelector('.progress-ring-circle');
    const progressText = document.querySelector('.progress-text');
    
    if (progressRing) {
        const radius = progressRing.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (percentage / 100) * circumference;
        
        progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
        progressRing.style.strokeDashoffset = offset;
    }
    
    if (progressText) {
        progressText.textContent = Math.round(percentage) + '%';
    }
}

// Quick Action Functions
function addQuickTask(daysFromToday = 0) {
    const taskText = prompt('Enter task:');
    if (taskText) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + daysFromToday);
        
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            priority: 'medium',
            date: targetDate.toISOString().split('T')[0],
            day: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][targetDate.getDay()],
            createdAt: new Date().toISOString()
        };
        
        addTask(task);
    }
}

function showOverdue() {
    const today = new Date().toISOString().split('T')[0];
    
    const overdueFilter = tasks.filter(task => 
        !task.completed && task.date < today
    );
    
    if (overdueFilter.length === 0) {
        alert('No overdue tasks!');
        return;
    }
    
    // Create a custom filter for overdue tasks
    currentFilter = 'overdue';
    currentDayTitle.textContent = 'Overdue Tasks';
    
    // Display only overdue tasks
    list.innerHTML = '';
    overdueFilter.forEach(task => {
        displayTask(task);
    });
}

function clearCompleted() {
    const completedTasks = tasks.filter(task => task.completed);
    
    if (completedTasks.length === 0) {
        alert('No completed tasks to clear!');
        return;
    }
    
    if (confirm(`Remove ${completedTasks.length} completed task(s)?`)) {
        // Remove completed tasks from local array
        tasks = tasks.filter(task => !task.completed);
        saveTasksToLocalStorage();
        displayTasks();
        updateDashboard();
        renderCalendar();
    }
}

function formatDateForDisplay(date) {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
        return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return translate('tomorrow') || 'Tomorrow';
    } else {
        return formatTranslatedDate(date, 'shortDate');
    }
}

// Initialize calendar and setup other components
function initializeCalendar() {
    setupCalendar();
    setupFilters();
    setupDayItems();
    initializeTimeslotCalendar();
}

// Override the existing displayTasks function to include dashboard updates
const originalDisplayTasks = displayTasks;
displayTasks = function() {
    originalDisplayTasks.call(this);
    updateDashboard();
};

// Override the existing addTask function to include dashboard updates
const originalAddTask = addTask;
addTask = async function(task) {
    await originalAddTask.call(this, task);
    updateDashboard();
};

// ==========================================
// SUGGESTIONS SYSTEM
// ==========================================

function initializeSuggestions() {
    const suggestionsTab = document.getElementById('suggestions-trigger');
    const suggestionsModal = document.getElementById('suggestions-modal');
    const closeSuggestions = document.getElementById('close-suggestions');
    const cancelSuggestions = document.getElementById('cancel-suggestions');
    const suggestionsForm = document.getElementById('suggestions-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccess = document.getElementById('close-success');
    const charCount = document.getElementById('char-count');
    const suggestionText = document.getElementById('suggestion-text');

    // Character counter for textarea
    if (suggestionText && charCount) {
        suggestionText.addEventListener('input', function() {
            const length = this.value.length;
            charCount.textContent = length;
            
            // Visual feedback for character limit
            if (length > 450) {
                charCount.style.color = '#e74c3c';
            } else if (length > 400) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#666';
            }
        });
    }

    // Open suggestions modal
    if (suggestionsTab) {
        suggestionsTab.addEventListener('click', function() {
            if (suggestionsModal) {
                suggestionsModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Focus on first input
                const nameInput = document.getElementById('suggestion-name');
                if (nameInput) {
                    setTimeout(() => nameInput.focus(), 100);
                }
            }
        });
    }

    // Close suggestions modal functions
    function closeSuggestionsModal() {
        if (suggestionsModal) {
            suggestionsModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        
        // Reset form
        if (suggestionsForm) {
            suggestionsForm.reset();
            if (charCount) charCount.textContent = '0';
        }
    }

    // Close modal events
    if (closeSuggestions) {
        closeSuggestions.addEventListener('click', closeSuggestionsModal);
    }
    
    if (cancelSuggestions) {
        cancelSuggestions.addEventListener('click', closeSuggestionsModal);
    }

    // Close on overlay click
    if (suggestionsModal) {
        suggestionsModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeSuggestionsModal();
            }
        });
    }

    // Form submission
    if (suggestionsForm) {
        suggestionsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name').trim();
            const email = formData.get('email').trim();
            const suggestion = formData.get('suggestion').trim();
            
            // Validation
            if (!name || !email || !suggestion) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }
            
            if (suggestion.length < 10) {
                showNotification('Please provide a more detailed suggestion (at least 10 characters).', 'error');
                return;
            }
            
            if (suggestion.length > 500) {
                showNotification('Suggestion is too long. Please keep it under 500 characters.', 'error');
                return;
            }
            
            // Simulate form submission
            submitSuggestion(name, email, suggestion);
        });
    }

    // Success modal close
    if (closeSuccess) {
        closeSuccess.addEventListener('click', function() {
            if (successModal) {
                successModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Close success modal on overlay click
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }

    // ESC key to close modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (suggestionsModal && suggestionsModal.style.display === 'flex') {
                closeSuggestionsModal();
            }
            if (successModal && successModal.style.display === 'flex') {
                successModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

function submitSuggestion(name, email, suggestion) {
    const submitBtn = document.getElementById('submit-suggestions');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '📤 Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call (replace with actual implementation)
    setTimeout(() => {
        // Hide suggestions modal
        const suggestionsModal = document.getElementById('suggestions-modal');
        if (suggestionsModal) {
            suggestionsModal.style.display = 'none';
        }
        
        // Show success modal
        const successModal = document.getElementById('success-modal');
        if (successModal) {
            successModal.style.display = 'flex';
        }
        
        // Reset form and button
        const suggestionsForm = document.getElementById('suggestions-form');
        if (suggestionsForm) {
            suggestionsForm.reset();
        }
        
        const charCount = document.getElementById('char-count');
        if (charCount) {
            charCount.textContent = '0';
            charCount.style.color = '#666';
        }
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        console.log('Suggestion submitted:', { name, email, suggestion });
        
        // In a real implementation, you would send this to your backend:
        // fetch('/api/suggestions', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ name, email, suggestion })
        // });
        
    }, 1500); // Simulate network delay
}

// Enhanced notification function for suggestions
function showSuggestionNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `suggestion-notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#e74c3c' : '#667eea'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 3001;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Show current alarm status
function showAlarmStatus() {
    // Load tasks from localStorage directly
    const tasksFromStorage = JSON.parse(localStorage.getItem('tasks') || '[]');
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    // Find tasks scheduled for today with specific times
    const todaysAlarms = tasksFromStorage.filter(task => 
        task.date === today && 
        task.startTime && 
        task.startTime.trim() !== ''
    );
    
    console.log(`📅 Checking alarms for today (${today})...`);
    
    if (todaysAlarms.length > 0) {
        console.log('🔔 Active alarms for today:');
        todaysAlarms.forEach(task => {
            const taskTime = new Date(`${task.date}T${task.startTime}`);
            const status = taskTime > now ? '⏰ Scheduled' : '✅ Past/Triggered';
            const timeUntil = taskTime > now ? Math.round((taskTime - now) / 60000) : 'N/A';
            console.log(`  ${status}: "${task.text}" at ${task.startTime}${timeUntil !== 'N/A' ? ` (in ${timeUntil} minutes)` : ''}`);
        });
    } else {
        console.log('🔕 No alarms scheduled for today');
    }
    
    // Also show global tasks array status
    if (typeof tasks !== 'undefined' && tasks.length > 0) {
        console.log(`📊 Global tasks array contains ${tasks.length} tasks`);
    } else {
        console.log('⚠️ Global tasks array is empty or undefined');
    }
}

// Initialize suggestions system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOM Content Loaded - Starting eTask initialization...');
    
    // Add to existing initialization
    initializeSuggestions();
    
    // Setup alarms and show status after initialization
    setTimeout(() => {
        console.log('⏰ Setting up alarms after DOM load...');
        setupAllAlarms();
        showAlarmStatus();
    }, 2000);
    
    console.log('✅ eTask application fully initialized with enhanced alarm system');
    console.log('💡 Type "testAlarm()" in the console to test the alarm system immediately');
});
