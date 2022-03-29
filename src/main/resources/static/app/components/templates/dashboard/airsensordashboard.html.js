export {template as default};

const template = `
	
	<div id="airSensorContainer" class="container-fluid nano-content" style="overflow-y: auto; position: static; padding-top: 10px;">
		<div class="row">
			<div class="col">
				<div id="airSensorSelector" style="width:200px;"></div>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col">
				<div class="container-fluid">		
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="pm10-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="pm25-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="pm1-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="co2-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="tvoc-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="temp-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="humi-chart-area" style="padding-top: 20px"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`;
