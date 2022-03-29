export {template as default};

const template = `
	<div id="airsensorStationPredictContainer" class="container-fluid nano-content" style="overflow-y: auto; position: static; padding-top: 10px;">
		<div class="row">
			<div class="col">
				<div id="stationSelectorPredict" style="width:200px;"></div>
			</div>
		</div>
		<div class="row justify-content-center">
			<div class="col">
				<div class="container-fluid">
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="pm25-chart-area-2"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="pm10-chart-area-2"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="no2-chart-area-2"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="co-chart-area-2"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="o3-chart-area-2"></canvas>
						</div>
					</div>
					<div class="row">
						<div class="col d-flex flex-wrap justify-content-center">
							<canvas id="so2-chart-area-2"></canvas>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
`;
