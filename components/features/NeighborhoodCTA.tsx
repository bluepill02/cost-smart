import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function NeighborhoodCTA() {
  return (
    <div className="bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="text-emerald-600" size={20} />
        <h3 className="text-lg font-bold text-slate-900">Know Your Neighborhood Before You Move</h3>
        <Badge className="bg-emerald-600 text-white">NEW</Badge>
      </div>
      <p className="text-slate-600 text-sm mb-4">
        Check nearby schools, hospitals, parks, transit, and shopping. Get a Neighborhood Score for any location before making your decision.
      </p>
      <Link
        href="/neighborhood-explorer"
        className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
      >
        Explore Neighborhoods <ArrowRight size={18} />
      </Link>
    </div>
  );
}
