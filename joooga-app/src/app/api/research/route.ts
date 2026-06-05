// src/app/api/research/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ResearchRequest, ResearchResult } from '../../../lib/types';
import { getPointsByArea } from '../../../lib/pointsData';
import { fetchCurrentWeather } from '../../../lib/weatherService';
import { calculatePointScore, rankPoints } from '../../../lib/scoringAlgorithm';

export async function POST(request: NextRequest) {
  try {
    const body: ResearchRequest = await request.json();

    // Validate request
    if (!body.area || !body.targetFish) {
      return NextResponse.json(
        { error: 'Invalid request: area and targetFish are required' },
        { status: 400 }
      );
    }

    // Get points for the area
    const points = getPointsByArea(body.area);
    if (points.length === 0) {
      return NextResponse.json(
        { error: 'No points available for the selected area' },
        { status: 404 }
      );
    }

    // Fetch current weather
    const weather = await fetchCurrentWeather();

    // Calculate scores for all points
    const scores = points.map(point =>
      calculatePointScore(point, weather, body.targetFish)
    );

    // Rank and get top 3
    const rankedScores = rankPoints(scores).slice(0, 3);

    const result: ResearchResult = {
      request: body,
      weather,
      recommendations: rankedScores,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(result);

  } catch (error) {
    console.error('Research API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Research API is running',
    version: '1.0.0',
    supportedAreas: ['jogashima']
  });
}