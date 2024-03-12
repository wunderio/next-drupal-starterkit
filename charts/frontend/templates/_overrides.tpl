{{/*
Override templates from subcharts.
*/}}

{{/*
The elasticsearch chart uses an incompatible naming scheme,
we make it compatible by overriding the following templates.
*/}}
{{- define "elasticsearch.uname" -}}
{{ .Release.Name }}-es
{{- end }}

{{- define "elasticsearch.masterService" -}}
{{ .Release.Name }}-es
{{- end }}

{{- define "elasticsearch.endpoints" -}}
{{ .Release.Name }}-es-0
{{- end -}}

{{/*
The rabbitmq chart has some unconventional naming logic, we prefer to keep things simple.
*/}}
{{- define "rabbitmq.fullname" -}}
{{ .Release.Name }}-rabbitmq
{{- end -}}

{{/*
The mariadb chart switched to an incompatible naming scheme,
we make it compatible by overriding the following templates.
*/}}
{{- define "mariadb.fullname" -}}
{{ .Release.Name }}-mariadb
{{- end }}

{{/*
The redis stack chart has some unconventional naming logic, we prefer to keep things simple.
*/}}
{{- define "redis-stack-server.fullname" -}}
{{ .Release.Name }}-redis-stack
{{- end -}}
