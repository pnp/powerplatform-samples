# All Images

<ul>
    {% for sample in samples %}
<li>
<h2>{{ sample.name}}</h2>
<img src="{{ sample.thumbnail }}" />
    {% endfor %}
    </ul>

<img src="https://telemetry.sharepointpnp.com/powerplatform-samples/docs/samples/images" />